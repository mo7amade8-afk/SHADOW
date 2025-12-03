import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import images from "./image.js";
import texts from "./text.js";
import videos from "./video.js";
import audios from "./audio.js";
import files from "./file.js";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

// ======= تخزين حالة المستخدمين =======
const shadowAccess = {}; // { chatId: true/false }

// ======= إرسال الرسائل =======
async function sendMessage(chatId, text) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text,
  });
}

async function sendPhoto(chatId, url) {
  await axios.post(API + "sendPhoto", { chat_id: chatId, photo: url });
}

async function sendVideo(chatId, url) {
  await axios.post(API + "sendVideo", { chat_id: chatId, video: url });
}

async function sendAudio(chatId, url) {
  await axios.post(API + "sendAudio", { chat_id: chatId, audio: url });
}

async function sendDocument(chatId, url) {
  await axios.post(API + "sendDocument", { chat_id: chatId, document: url });
}

// ======= تجميع الأوامر =======
const ALL = { ...images, ...texts, ...videos, ...audios, ...files };
const ALL_KEYS = Object.keys(ALL);

// ======= القوائم =======
function getMenu() {
  let txt = `
★.･*:｡≻──── ⋆☆⋆ ────.•*:｡★
👑 ♤ طائفة الظلام ♤ 👑

🔥🍸﴿ قائمة السوداء ﴾🍸🔥
`;

  ALL_KEYS.forEach((cmd, i) => {
    txt += `${i + 1} - ${cmd}\n`;
  });

  txt += `
★.･*:｡≻──── ⋆☆⋆ ────.•*:｡★
`;
  return txt;
}

// ======= Webhook =======
app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const userText = msg.text?.trim();
    if (!userText) return;

    const firstWord = userText.split(" ")[0]; // يأخذ الكلمة الأولى فقط

    // ======= START =======
    if (firstWord === "/start") {
      shadowAccess[chatId] = false;
      return sendMessage(
        chatId,
        "شكّل أمر «قائمة السوداء» ليظهر أمامك جميع الأوامر."
      );
    }

    // ======= دخول قائمة السوداء =======
    if (firstWord === "قائمة" || userText === "قائمة السوداء") {
      shadowAccess[chatId] = false;
      return sendMessage(
        chatId,
        "أدخل كلمة السر… يجب أن تكون ظلاً لدخول قائمة السوداء."
      );
    }

    // ======= كلمة السر للطائفة =======
    if (userText === "shadow/2000") {
      shadowAccess[chatId] = true;
      return sendMessage(chatId, getMenu());
    }

    // ======= التحقق من الدخول =======
    if (!shadowAccess[chatId]) {
      return sendMessage(
        chatId,
        "لا يجب التسلل بدون دخول إلى قائمة السوداء."
      );
    }

    // ======= تنفيذ الأوامر — متعدد الروابط =======
    const cmd = firstWord;

    if (ALL[cmd]) {
      const value = ALL[cmd];

      if (Array.isArray(value)) {
        for (let item of value) {
          if (images[cmd]) await sendPhoto(chatId, item);
          else if (videos[cmd]) await sendVideo(chatId, item);
          else if (audios[cmd]) await sendAudio(chatId, item);
          else if (files[cmd]) await sendDocument(chatId, item);
        }
      } else {
        if (images[cmd]) return sendPhoto(chatId, value);
        if (texts[cmd]) return sendMessage(chatId, value);
        if (videos[cmd]) return sendVideo(chatId, value);
        if (audios[cmd]) return sendAudio(chatId, value);
        if (files[cmd]) return sendDocument(chatId, value);
      }
    }

    return sendMessage(chatId, "يالك من غبي تافه من سمح لك بالوصول الى هنا 🤨😆");
  } catch (e) {
    console.log("ERROR:", e);
  }
});

app.listen(3000, () => console.log("Server running..."));
