import { defineConfig } from "prisma/config";

// Décision explicite du chargement des variables selon l'environnement.
// - En développement : on charge le fichier .env local.
// - En production (conteneur Docker) : les variables sont déjà injectées
//   par Docker via env_file, donc on ne charge aucun fichier.
const environment = process.env.NODE_ENV ?? "development";

switch (environment) {
  case "production":
    break;
  default:
    require("dotenv").config();
    break;
}

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error(
    `DATABASE_URL introuvable (NODE_ENV=${environment}). ` +
      `En développement, vérifiez votre fichier .env. ` +
      `En production, vérifiez que Docker injecte bien la variable via env_file.`
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});