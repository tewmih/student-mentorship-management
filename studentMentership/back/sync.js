import { readdirSync } from "fs";
import { join, basename } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "./config/db.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const modelsPath = join(__dirname, "models");
const models = {};

for (const file of readdirSync(modelsPath)) {
  if (file.endsWith(".js")) {
    // Convert Windows path to a proper file:// URL for ESM import
    const modelModule = await import(
      pathToFileURL(join(modelsPath, file)).href
    );
    const model = modelModule.default;
    models[model.name] = model;
  }
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ All models synced and tables created in DB");

    process.exit(0);
  } catch (error) {
    console.error("❌ Unable to sync database:", error);
    process.exit(1);
  }
})();
