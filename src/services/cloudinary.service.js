// // src/controllers/cloudinary.service.js
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// const uploadToCloudinary = async (filePath, folder = "weddings/media") => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: folder,
//       resource_type: "auto", // Automatically detects image or video
//       chunk_size: 6000000, // Better for larger video files
//       transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
//     });

//     // Delete local file after successful upload
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     return result;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error.message);

//     // Clean up local file even if upload fails
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     throw new Error(`Cloudinary upload failed: ${error.message}`);
//   }
// };

// const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: "auto", // Works for both images and videos
//     });
//     return result;
//   } catch (error) {
//     console.error("Cloudinary delete error:", error.message);
//     throw error;
//   }
// };

// module.exports = {
//   uploadToCloudinary,
//   deleteFromCloudinary,
// };

// src/controllers/cloudinary.service.js  (or services/cloudinary.service.js)
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (fileInput, folder = "weddings/media") => {
  try {
    let uploadOptions = {
      folder: folder,
      resource_type: "auto",
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    };

    // For QR codes, we can force image and add small optimizations
    if (typeof fileInput === "string" && fileInput.startsWith("data:image")) {
      uploadOptions.resource_type = "image";
      // Optional: better for small QR codes
      uploadOptions.transformation = [
        { quality: "auto:good" },
        { fetch_format: "png" }, // PNG is best for QR codes (sharp)
      ];
    }

    const result = await cloudinary.uploader.upload(fileInput, uploadOptions);

    // Only delete local file if it's a real file path (not data URL)
    if (typeof fileInput === "string" && !fileInput.startsWith("data:")) {
      if (fs.existsSync(fileInput)) {
        fs.unlinkSync(fileInput);
      }
    }

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    // Clean up local file only if it exists and is not a data URL
    if (
      typeof fileInput === "string" &&
      !fileInput.startsWith("data:") &&
      fs.existsSync(fileInput)
    ) {
      fs.unlinkSync(fileInput);
    }

    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};
