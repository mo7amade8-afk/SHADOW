import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

// 
import images from "./image.js";
import texts from "./text.js";
import videos from "./video.js";
import audios from "./audio.js";
import files from "./file.js";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

// 
async function sendMessage(chatId, text) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text: text
  });
}

// 
async function sendPhoto(chatId, url) {
  await axios.post(API + "sendPhoto", {
    chat_id: chatId,
    photo: url
  });
}

// 
async function sendVideo(chatId, url) {
  await axios.post(API + "sendVideo", {
    chat_id: chatId,
    video: url
  });
}

// 
async function sendAudio(chatId, url) {
  await axios.post(API + "sendAudio", {
    chat_id: chatId,
    audio: url
  });
}

// 
async function sendDocument(chatId, url) {
  await axios.post(API + "sendDocument", {
    chat_id: chatId,
    document: url
  });
}


// =====================================================
//  
// =====================================================

// 
const ALL_COMMANDS = {
  ...images,
  ...texts,
  ...videos,
  ...audios,
  ...files
};

// 
const commandKeys = Object.keys(ALL_COMMANDS);

// 
function getMenuPage(page = 1) {
  const perPage = 5;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const slice = commandKeys.slice(start, end);

  if (slice.length === 0) return "❌ لا توجد قائمة بهذا الرقم";

  let text = `
★.･*:｡≻──── ⋆☆⋆ ────.•*:｡★
👑 𝑴𝒂𝒓𝒔𝒉𝒆𝒍 𝑫 𝑺𝒉𝒂𝒅𝒐𝒘 👑

🔥🍸﴿ الجزء ${page} ﴾🍸🔥
`;

  slice.forEach((cmd, index) => {
    text += `${start + index + 1} - ${cmd}\n`;
  });

  text += `
♛ ل̶ع̶ر̶ظ̶ ب̶ا̶ق̶ي̶ ا̶ل̶ق̶و̶ا̶ئم̶ ا̶ك̶ت̶ب̶ : ﴿قائمة¹²³﴾ ♛

★.･*:｡≻──── ⋆☆⋆ ────.•*:｡★
`;

  return text;
}


// =====================================================
//  Webhook
// =====================================================

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    // تشغيل البوت
    if (text === "/start") {
      return sendMessage(chatId, "Bot is ready");
    }

    // عرض القوائم — مثال: قائمة 1
    if (text?.startsWith("قائمة")) {
      const parts = text.split(" ");
      const page = parseInt(parts[1]) || 1;
      return sendMessage(chatId, getMenuPage(page));
    }

    // تنفيذ أوامر الملفات
    if (images[text]) return sendPhoto(chatId, images[text]);
    if (texts[text]) return sendMessage(chatId, texts[text]);
    if (videos[text]) return sendVideo(chatId, videos[text]);
    if (audios[text]) return sendAudio(chatId, audios[text]);
    if (files[text]) return sendDocument(chatId, files[text]);

    // أمر غير معروف
    sendMessage(chatId, "Unknown command ❌");
  } catch (err) {
    console.log("Error:", err);
  }
});

app.listen(3000, () => console.log("Server running..."));
