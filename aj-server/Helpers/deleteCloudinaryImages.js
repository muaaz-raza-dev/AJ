const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.C_cloud_name,
  api_key: process.env.C_api_key,
  api_secret: process.env.C_api_secret,
});

async function deleteCloudinaryImages(images) {
  try {
    for (const url of images) {
      await deleteImage(url);
    }
    async function deleteImage(url) {
      // Extract the public_id from the URL
      const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
      const matches = url.match(regex);
      const publicId = matches ? matches[1] : null;

      if (!publicId) {
          throw new Error(" Could not extract publicId");
      }

      // Delete the image using the extracted public_id
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === "ok") {
        console.log("Image deleted successfully:", publicId);
      } else {
        throw new Error("Failed to delete image");
      }
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

module.exports = deleteCloudinaryImages;
