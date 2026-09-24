const express = require("express");
const Destination = require("../models/Destination");

const router = express.Router();
const writableFields = [
  "name",
  "location",
  "category",
  "description",
  "image",
  "bestTime",
  "budget",
];

function pickWritableFields(body) {
  return writableFields.reduce((payload, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      payload[field] = body[field];
    }
    return payload;
  }, {});
}

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      50
    );
    const [destinations, total] = await Promise.all([
      Destination.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Destination.countDocuments(),
    ]);

    res.setHeader("X-Total-Count", total);
    res.status(200).json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch destinations",
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
    console.error(error);
    res.status(400).json({
      message: "Invalid destination ID",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const destination = await Destination.create(pickWritableFields(req.body));

    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create destination",
      error: error.name === "ValidationError" ? error.message : undefined,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = pickWritableFields(req.body);
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      updates,
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
      error: error.name === "ValidationError" ? error.message : undefined,
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
    console.error(error);
    res.status(400).json({
      message: "Invalid destination ID",
    });
  }
});

module.exports = router;