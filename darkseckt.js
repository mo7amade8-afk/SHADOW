import { ShadowCore } from "./SHADOW/xxx.js";

export class DarkSystem {
  constructor() {
    console.log("[DARKSECKT] Loaded");
    this.shadow = new ShadowCore();
  }

  async handleMessage(data) {
    try {
      const result = await this.shadow.process(data);
      return result;
    } catch (err) {
      console.error("[DARKSECKT ERROR]", err);
      throw err;
    }
  }
}
