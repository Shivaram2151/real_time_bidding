const Item = require("../models/Item");
const fs = require("fs");
const path = require("path");
const upload = require("../config/multerConfig");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

const uploadImage = upload.single("image");
exports.createItem = async (req, res) => {
  const user_id = req.user.id;
  try {
    uploadImage(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        return res.status(500).json({ message: "Server error" + err });
      }

      const { name, description, starting_price, end_time, current_price } =
        req.body;
      console.log(req.file);
      const image_url = `uploads/${req.file.originalname}`;

      // Create a new auction item
      const newItem = await Item.create({
        name,
        description,
        starting_price,
        current_price,
        end_time,
        image_url,
        user_id,
      });
      res.status(201).json({ message: "Image uploaded successfully", newItem });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" + error });
  }
};

// exports.getAllItems = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

//     const items = await Item.findAll();
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.getAllItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items per page

  try {
    const items = await Item.findAndCountAll({
      offset: (page - 1) * limit,
      limit: limit,
    });

    const totalItems = items.count;
    const totalPages = Math.ceil(totalItems / limit);

    const pagination = {};

    if ((page - 1) * limit > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    if (page < totalPages) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    res.status(200).json({ items: items.rows, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" + error });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, endTime, image_url } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    const updatedItem = await item.update({
      name,
      description,
      startingPrice,
      endTime,
      image_url,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" + error });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    await item.destroy();
    res.status(204).send("delete item");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
