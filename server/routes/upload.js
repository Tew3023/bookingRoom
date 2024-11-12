const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadDir = path.join(__dirname, "../upload");

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or image files are allowed"));
    }
  },
});

router.post("/", upload.single("resume"), async (req, res) => {
  const { career, email, careerId ,coverLetter } = req.body;

  if (!career || !email || !careerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await prisma.jobApplication.create({
      data: {
        email,
        applicantName: career,
        careerId,
        resumeUrl: path.basename(req.file.path), 
        coverLetter 
      },
    });

    res.status(200).json({ message: "File uploaded successfully", result });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Error uploading file", error: err.message });
  }
});

module.exports = router;
