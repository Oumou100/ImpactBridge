import multer from "multer";
import { Router } from "express";
import { cloudinary } from "@/core/config/cloudinary";
import { AppError } from "@/app/middlewares/error-handler";
import { created } from "@/app/http/response";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: (Number(process.env.UPLOAD_MAX_FILE_MB ?? 5) || 5) * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      callback(new AppError("Type de fichier invalide. Formats acceptes: jpg, png, webp", 400));
      return;
    }
    callback(null, true);
  },
});

export const uploadsRouter = Router();

uploadsRouter.post("/uploads/image", upload.single("file"), async (req, res, next) => {
  try {
    console.log("[UPLOAD] Requete recue", {
      hasFile: Boolean(req.file),
      mimetype: req.file?.mimetype,
      size: req.file?.size,
    });

    if (!req.file) {
      throw new AppError("Fichier requis", 400);
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new AppError("Cloudinary non configure", 503);
    }

    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "impactbridge/activities",
          resource_type: "image",
        },
        (error, uploaded) => {
          if (error || !uploaded) {
            console.error("[UPLOAD] Echec Cloudinary", {
              error: error ? String(error) : "No uploaded payload returned",
            });
            reject(error ?? new Error("Upload failed"));
            return;
          }

          resolve({
            secure_url: uploaded.secure_url,
            public_id: uploaded.public_id,
          });
        },
      );

      stream.end(req.file?.buffer);
    });

    console.log("[UPLOAD] Succes Cloudinary", {
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });

    return created(res, "Image uploaded successfully", result);
  } catch (error) {
    console.error("[UPLOAD] Erreur route upload", {
      error: error instanceof Error ? error.message : String(error),
    });
    next(error);
  }
});
