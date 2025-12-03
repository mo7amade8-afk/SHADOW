import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ShadowCore {
  constructor() {
    this.modules = {};
    this.loadModules();
  }

  loadModules() {
    const shadowPath = path.join(__dirname);

    const files = fs.readdirSync(shadowPath);

    for (const file of files) {
      if (
        file.endsWith(".js") &&
        file !== "xxx.js"
      ) {
        const moduleName = file.replace(".js", "");
        const modulePath = path.join(shadowPath, file);

        import(modulePath).then((mod) => {
          if (mod && typeof mod.handle === "function") {
            this.modules[moduleName] = mod;
            console.log(`[SHADOW] Loaded module: ${moduleName}`);
          } else {
            console.warn(`[SHADOW] Skipped (no handler): ${moduleName}`);
          }
        });
      }
    }
  }

  async process(data) {
    const { type } = data;

    if (!type) {
      throw new Error("Missing type in request.");
    }

    const module = this.modules[type];

    if (!module) {
      throw new Error(`Module not found: ${type}`);
    }

    return await module.handle(data);
  }
}
