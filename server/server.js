const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// створюємо папку для фото якщо нема
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// multer (збереження файлів)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// "база даних" в памʼяті
let inventory = [];

// GET all
app.get("/inventory", (req, res) => {
  res.json(inventory);
});

// GET by id
app.get("/inventory/:id", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(item);
});

// CREATE
app.post("/register", upload.single("photo"), (req, res) => {
  const newItem = {
    id: Date.now(),
    inventory_name: req.body.inventory_name,
    description: req.body.description,
    photo: req.file ? req.file.filename : null,
  };

  inventory.push(newItem);

  res.status(201).json(newItem);
});

// UPDATE text
app.put("/inventory/:id", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  item.inventory_name = req.body.inventory_name;
  item.description = req.body.description;

  res.json(item);
});

// UPDATE photo
app.put("/inventory/:id/photo", upload.single("photo"), (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  item.photo = req.file.filename;

  res.json(item);
});

// DELETE
app.delete("/inventory/:id", (req, res) => {
  inventory = inventory.filter((i) => i.id != req.params.id);

  res.json({ message: "Deleted" });
});

// GET image
app.get("/inventory/:id/photo", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item || !item.photo) {
    return res.status(404).send("No photo");
  }

  res.sendFile(path.join(__dirname, "uploads", item.photo));
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});