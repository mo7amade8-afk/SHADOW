import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import image from "./image.js";
import texts from "./text.js";   // مهم جداً

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

async function sendMessage(chatId, text) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text: text
  });
}

async function sendPhoto(chatId, url) {
  await axios.post(API + "sendPhoto", {
    chat_id: chatId,
    photo: url
  });
}

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    if (text === "/start") {
      return sendMessage(chatId, "Bot is ready");
    }

    if (image[text]) return sendPhoto(chatId, image[text]);
    if (texts[text]) return sendMessage(chatId, texts[text]);

    sendMessage(chatId, "Unknown command");
  } catch (e) {
    console.log("Error:", e);
  }
});

app.listen(3000, () => {
  console.log("Server running...");
});
