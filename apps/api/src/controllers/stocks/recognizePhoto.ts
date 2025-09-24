import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/search-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const formData = new FormData();
  formData.append("image", fs.createReadStream(req.file.path));

  const response = await fetch("http://ml-service:5000/search", {
    method: "POST",
    body: formData as any
  });

  const data = await response.json();
  res.json(data);
});

export default router;
