import { ShadowCore } from "./SHADOW/xxx.js";

export class DarkSystem {
  constructor() {
    console.log("[DARKSECKT] Loaded");
    this.core = new ShadowCore();
  }

  async handleMessage(data) {
    return await this.core.process(data);
  }
}
