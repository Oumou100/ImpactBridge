import "dotenv/config";
import { env } from "@/core/config/env";
import { createApp } from "@/app/app";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`ImpactBridge API listening on http://localhost:${env.PORT}`);
  console.log(`Swagger docs available at http://localhost:${env.PORT}/docs`);
});
