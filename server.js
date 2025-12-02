import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import image from "./image.js";
import text from "./text.js";
import video from "./video.js";
import audio from "./audio.js";
import file from "./file.js";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

async function sendMessage(chatId, message) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text: message
  });
}

async function sendPhoto(chatId, url) {
  await axios.post(API + "sendPhoto", {
    chat_id: chatId,
    photo: url
  });
}

async function sendVideo(chatId, url) {
  await axios.post(API + "sendVideo", {
    chat_id: chatId,
    video: url
  });
}

async function sendAudio(chatId, url) {
  await axios.post(API + "sendAudio", {
    chat_id: chatId,
    audio: url
  });
}

async function sendFile(chatId, url) {
  await axios.post(API + "sendDocument", {
    chat_id: chatId,
    document: url
  });
}

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const userText = msg.text?.trim();

    if (userText === "/start") {
      return sendMessage(chatId, "Bot is ready.");
    }

    if (image[userText]) return sendPhoto(chatId, image[userText]);
    if (text[userText]) return sendMessage(chatId, text[userText]);
    if (video[userText]) return sendVideo(chatId, video[userText]);
    if (audio[userText]) return sendAudio(chatId, audio[userText]);
    if (file[userText]) return sendFile(chatId, file[userText]);

    sendMessage(chatId, "Unknown command.");
  } catch (e) {
    console.log("Error:", e);
  }
});

app.listen(3000, () => {
  console.log("Server running...");
});
