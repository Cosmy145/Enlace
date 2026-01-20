import cloudinary from "./utils/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadLogo() {
  try {
    // Path to your logo SVG
    const logoPath = path.join(
      __dirname,
      "../../frontend/src/components/icons/Logo.svg"
    );

    console.log("Uploading logo to Cloudinary...");

    const result = await cloudinary.uploader.upload(logoPath, {
      folder: "enlace-assets",
      public_id: "enlace-logo",
      resource_type: "image",
      format: "png", // Convert SVG to PNG for better email compatibility
    });

    console.log("\n✅ Logo uploaded successfully!");
    console.log("URL:", result.secure_url);
    console.log("\nAdd this to your .env file:");
    console.log(`LOGO_URL=${result.secure_url}`);

    return result.secure_url;
  } catch (error) {
    console.error("❌ Error uploading logo:", error);
    throw error;
  }
}

uploadLogo();
