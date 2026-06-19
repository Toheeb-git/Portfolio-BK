const express = require("express");
const multer = require("multer");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const protect = require("../middleware/auth");

const router = express.Router();

const upload = multer({ dest: "uploads/" });


router.get("/", getProjects);
router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;