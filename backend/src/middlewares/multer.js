const multer = require("multer");

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Renommer le fichier avec un timestamp
  },
});

// Initialisation de Multer
const upload = multer({ storage: storage });

// Exporter le middleware
module.exports = upload;
