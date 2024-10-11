const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Konfigurasi Cloudinary
cloudinary.config({

  cloud_name: 'dqczvxzoq',
  api_key: '969926655166495',
  api_secret: 'uiEdRSngL2HRT1ABhbzjA5mx9-Q'

});

// Set up Cloudinary storage untuk Multer
const storage = new CloudinaryStorage({

  cloudinary: cloudinary,
  params: {
    folder: 'Dynamic folders', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'], // Format gambar yang diizinkan
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: bisa juga melakukan transformasi ukuran file
  },

});

const upload = multer({ storage });

module.exports = upload;
