import { AdminImage } from "../IMAGES/adminimage.js";

export class IMGCore {
  constructor() {
    this.admin = new AdminImage();

    this.validExtensions = [
      ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff"
    ];
  }

  isValidImage(url) {
    try {
      const lower = url.toLowerCase();
      return this.validExtensions.some(ext => lower.endsWith(ext));
    } catch {
      return false;
    }
  }

  async process(input) {
    if (!input || !input.images) {
      return { error: "No image links received." };
    }

    const links = Array.isArray(input.images) ? input.images : [input.images];

    const validLinks = links.filter(url => this.isValidImage(url));

    if (validLinks.length === 0) {
      return { error: "No valid image URLs provided." };
    }

    try {
      const result = await this.admin.handle(validLinks);
      return { success: true, data: result };
    } catch (err) {
      return { error: "AdminImage processing failed.", details: err.message };
    }
  }
}
