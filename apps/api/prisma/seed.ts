import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "adminoumou@impactbridge.org";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin!23@";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash, isActive: true },
    create: {
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  // Seed a minimal published activity for demo purposes
  await prisma.activity.upsert({
    where: { slug: "premiere-activite-impactbridge" },
    update: {},
    create: {
      title: "Premiere activite ImpactBridge",
      slug: "premiere-activite-impactbridge",
      description: "Activite de lancement pour la plateforme ONG.",
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
