import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

// The mastermind controller
import { handleUpdate } from "./darkseckt.js";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

// Send text message
async function sendMessage(chatId, text) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text: text
  });
}

// Send media dynamically
async function sendMedia(chatId, payload) {
  await axios.post(API + payload.method, {
    chat_id: chatId,
    ...payload.data
  });
}

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  const message = req.body.message;
  if (!message) return;

  const userText = message.text?.trim() || "";
  const chatId = message.chat.id;

  // Get response from darkseckt.js
  const result = await handleUpdate(userText, chatId);

  if (!result) return;

  if (result.type === "text") {
    return sendMessage(chatId, result.text);
  }

  if (result.type === "media") {
    return sendMedia(chatId, result);
  }
});

app.listen(3000, () => console.log("Server running..."));
