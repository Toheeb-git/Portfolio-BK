const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

exports.createProject = async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path);

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
     tech: req.body.tech.split(",").map(t => t.trim()),
      image: result.secure_url,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};