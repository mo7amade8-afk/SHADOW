import { AdminImage } from "../IMAGES/adminimage.js";

// 
const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml"
];

// 
export const ImageHandler = {
    name: "img",
    aliases: ["image", "sendimage"],

    run: async (client, message, args) => {
        try {
            //
            if (!args[0]) {
                return message.reply("أرسل رابط صورة واحد أو أكثر");
            }

            // 
            const links = args;

            // 
            const result = await AdminImage(links, allowedTypes);

            // 
            return message.reply(result);

        } catch (err) {
            console.error(err);
            return message.reply("⚠");
        }
    }
};
