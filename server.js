import express from "express";
import { Telegraf } from "telegraf";
import textData from "./text.js";
import image from "./image.js";
import video from "./video.js";
import audio from "./audio.js";
import file from "./file.js";

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// الرد على أي رسالة
bot.on("text", async (ctx) => {
    const text = ctx.message.text;

    console.log("User sent:", text); // مهم جداً لمعرفة ماذا يصل

    // الرد من ملفات
    if (image[text]) return ctx.replyWithPhoto(image[text]);
    if (textData[text]) return ctx.reply(textData[text]);
    if (video[text]) return ctx.replyWithVideo(video[text]);
    if (audio[text]) return ctx.replyWithAudio(audio[text]);
    if (file[text]) return ctx.replyWithDocument(file[text]);

    // رد افتراضي
    ctx.reply("لم أفهم، جرّب أمر آخر ✨");
});

// تشغيل البوت
bot.launch();

// لمنع Render من النوم
app.get("/", (req, res) => {
    res.send("Bot is running");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
