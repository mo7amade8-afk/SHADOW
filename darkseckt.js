import { ShadowCore } from "./SHADOW/xxx.js";

export function initDarkController() {
  const shadow = new ShadowCore();

  return {
    handleMessage: async (data) => {
      try {
        const result = await shadow.process(data);
        return result;
      } catch (err) {
        console.error("[DARKSECKT] Error:", err);
        throw err;
      }
    }
  };
}
