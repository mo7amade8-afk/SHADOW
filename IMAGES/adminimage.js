export const AdminImage = async (links, allowedTypes) => {
    let output = "📸 تم فحص الصور:\n\n";

    for (const url of links) {
        // فحص الصيغة عبر الامتداد (بسيط وسريع)
        const ext = url.split(".").pop().toLowerCase();

        const valid =
            ["jpg","jpeg","png","gif","webp","svg"].includes(ext);

        if (!valid) {
            output += `❌ الصيغة غير مسموحة: ${url}\n`;
            continue;
        }

        output += `✔ تم قبول الصورة: ${url}\n`;
    }

    return output;
};
