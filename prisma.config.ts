import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

type Environment = "production" | "ci" | "development";

function resolveEnvironment(): Environment {
  if (process.env.CI === "true") return "ci";
  if (process.env.NODE_ENV === "production") return "production";
  return "development";
}

const environment = resolveEnvironment();

// En dev local, on charge le .env s'il existe (pour fournir DATABASE_URL).
// En prod (Docker runtime) et CI, les variables viennent de l'environnement.
// On ne valide PAS la présence de l'URL ici : prisma generate n'en a pas
// besoin, et les commandes qui en ont besoin (migrate) lèvent leur propre
// erreur si elle manque.
if (environment === "development") {
  loadEnv();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});