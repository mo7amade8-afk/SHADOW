import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

// محتويات image.js
const image = {
  جلجامشة: "https://github.com/جلجامشة.jpg",
  dog: "https://github.com/جلجامشة.jpg"
};

// محتويات text.js
const texts = {
  hello: "Hello, welcome!",
  info: "This is information message."
};

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

    if (image[userText]) return sendPhoto(chatId, image[userText]);
    if (texts[userText]) return sendMessage(chatId, texts[userText]);

    return sendMessage(chatId, "Unknown command");
  } catch (err) {
    console.log("Error:", err);
  }
});

app.listen(3000, () => {
  console.log("Server running...");
});
