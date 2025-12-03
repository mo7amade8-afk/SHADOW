import fs from "fs";
import path from "path";

export async function handleAdminImage(bot, msg, options) {
    const basePath = path.resolve("./src/IMAGES");

    // Upload image to report system
    if (options.type === "upload") {
        return bot.sendMessage(msg.chat.id, "Image received and ready to process.");
    }

    // Call imageX.js
    if (options.type === "call") {
        const filePath = path.join(basePath, `image${options.id}.js`);

        if (!fs.existsSync(filePath)) {
            return bot.sendMessage(msg.chat.id, `image${options.id}.js not found.`);
        }

        const module = await import(`../IMAGES/image${options.id}.js`);
        if (!module.default) {
            return bot.sendMessage(msg.chat.id, `image${options.id}.js missing default export.`);
        }

        return module.default(bot, msg);
    }

    // Album mode: send multiple links
    if (options.type === "album") {
        const links = options.links;
        if (!links.length) return bot.sendMessage(msg.chat.id, "No links provided.");

        const media = links.map(url => ({
            type: "photo",
            media: url
        }));

        return bot.sendMediaGroup(msg.chat.id, media);
    }
}
