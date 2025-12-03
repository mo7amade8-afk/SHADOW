import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function loadAPKModules() {
  const dir = path.join(__dirname);
  const files = fs.readdirSync(dir);

  const registry = {};

  files.forEach((file) => {
    if (
      file.endsWith(".js") &&
      file !== "report.js" &&
      file !== "adminapk.js"
    ) {
      const moduleName = file.replace(".js", "");
      const modulePath = path.join(dir, file);

      try {
        const imported = await import(url.pathToFileURL(modulePath).href);
        registry[moduleName] = imported.default || imported;
      } catch (err) {
        console.error(`[REPORT] Failed to load '${moduleName}':`, err);
      }
    }
  });

  return registry;
}
