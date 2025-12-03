
import * as apk1 from "./apk1.js";
import * as apk2 from "./apk2.js";
import * as apk3 from "./apk3.js";

const sources = {
  ...apk1.default,
  ...apk2.default,
  ...apk3.default
};

export async function handleAdminApk(cmd) {
  if (!sources[cmd]) return null;

  const list = sources[cmd];

  if (Array.isArray(list)) {
    return list;
  }

  return [list];
}
