const express = require("express");
const Destination = require("../models/Destination");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch destinations",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({
      message: "Invalid destination ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create destination",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update destination",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(
      req.params.id
    );

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid destination ID",
    });
  }
});

module.exports = router;s