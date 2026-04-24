module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  database: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/wedding-platform',
  },
  email: {
    apiKey: process.env.SENDGRID_API_KEY,
    senderEmail: process.env.SENDGRID_SENDER_EMAIL || 'noreply@weddingplatform.com',
  },
};
