import { handleAdminApk } from "../APKS/adminapk.js";

export class ApkController {
  constructor() {
    this.admin = handleAdminApk;
  }

  async process(command) {
    if (!command || typeof command !== "string") return null;

    const normalized = command.trim().toLowerCase();

    return await this.admin(normalized);
  }
}
