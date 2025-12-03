import { handleAdminImage } from "../IMAGES/adminimage.js";

export async function handleImageCommand(bot, msg) {
    const args = msg.text.split(" ");
    const command = args[0];
    const imageArg = args[1];

    // Accept any image format: png, jpg, jpeg, gif, webp, ai
    if (msg.photo || msg.document || msg.animation) {
        return handleAdminImage(bot, msg, { type: "upload" });
    }

    // /image 1  → calls image1.js
    if (command === "/image" && imageArg) {
        return handleAdminImage(bot, msg, { type: "call", id: imageArg });
    }

    // /album + links
    if (command === "/album") {
        return handleAdminImage(bot, msg, { type: "album", links: args.slice(1) });
    }

    return bot.sendMessage(msg.chat.id, "Invalid image command.");
}
