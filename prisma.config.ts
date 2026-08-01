import { defineConfig } from "prisma/config";

type Environment = "production" | "ci" | "development";

function resolveEnvironment(): Environment {
  if (process.env.CI === "true") return "ci";
  if (process.env.NODE_ENV === "production") return "production";
  return "development";
}

const environment = resolveEnvironment();

switch (environment) {
  case "production":
    break;

  case "ci":
    break;

  case "development":
    require("dotenv").config();
    if (!process.env["DATABASE_URL"]) {
      throw new Error(
        "DATABASE_URL introuvable en développement. Vérifiez votre fichier .env."
      );
    }
    break;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});