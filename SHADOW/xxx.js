import img from "./img.js";
import apk from "./apk.js";
import aud from "./aud.js";
import fil from "./fil.js";
import txt from "./txt.js";
import lnk from "./lnk.js";
import gpg from "./Gpg.js";

export class ShadowCore {
  constructor() {
    this.handlers = {
      img,
      apk,
      aud,
      fil,
      txt,
      lnk,
      gpg
    };
  }

  async process(data) {
    if (!data || !data.type) {
      return { error: "No type provided" };
    }

    const handler = this.handlers[data.type];

    if (!handler) {
      console.log("[SHADOW] Skipped (no handler):", data.type);
      return { ok: false, skipped: data.type };
    }

    return await handler(data);
  }
}
