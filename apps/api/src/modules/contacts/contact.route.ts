import { Router } from "express";
import { z } from "zod";
import { validateBody } from "@/app/middlewares/validate";
import { created, ok } from "@/app/http/response";
import {
  contactListQuerySchema,
  createContactSchema,
  updateContactStatusSchema,
} from "./contact.schema";
import { listContacts, submitContact, updateContactStatus } from "./contact.service";

export const contactsPublicRouter = Router();
export const contactsAdminRouter = Router();

contactsPublicRouter.post(
  "/contact",
  validateBody(createContactSchema),
  async (req, res, next) => {
    try {
      const result = await submitContact(req.body);
      return created(res, "Message de contact envoye avec succes", result);
    } catch (error) {
      next(error);
    }
  },
);

contactsAdminRouter.get("/contacts", async (req, res, next) => {
  try {
    const parsed = contactListQuerySchema.parse(req.query);
    const result = await listContacts(parsed);
    return ok(res, "Messages de contact recuperes", result.data, result.meta);
  } catch (error) {
    next(error);
  }
});

contactsAdminRouter.patch(
  "/contacts/:id/status",
  validateBody(updateContactStatusSchema),
  async (req, res, next) => {
    try {
      const id = z.string().uuid().parse(req.params.id);
      const updated = await updateContactStatus(id, req.body.status);
      return ok(res, "Statut du message mis a jour", updated);
    } catch (error) {
      next(error);
    }
  },
);
