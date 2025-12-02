import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import image from "./image.js";
import textData from "./text.js"; // 

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
    const userText = msg.text?.trim();

    if (userText === "/start") {
      return sendMessage(chatId, "Bot is ready");
    }

    // 
    if (image[userText]) {
      return sendPhoto(chatId, image[userText]);
    }

    // 
    if (textData[userText]) {
      return sendMessage(chatId, textData[userText]);
    }

    // 
    sendMessage(chatId, "Unknown command");
  } catch (e) {
    console.log("Error:", e);
  }
});

app.listen(3000, () => {
  console.log("Server running...");
});
