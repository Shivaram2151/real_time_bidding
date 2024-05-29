const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
