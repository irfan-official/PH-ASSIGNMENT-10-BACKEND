import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import verifyOrigin from "../middlewares/allowOrigin.middleware.js";
import verifyJWTToken from "../middlewares/firebase.jwt.middleware.js";
import { createOne, find, findOne } from "../utils/mongodbCRUD.js";

import Comment from "../models/comment.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataPath = path.join(__dirname, "../utils/MOCK_DATA.json");
const mockData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello api_route",
  });
});

router.get("/data", verifyOrigin, (req, res) => {
  return res.status(200).json(mockData);
});

// router.post("/add-data", verifyOrigin, async (req, res) => {
//   const data = await createFood({
//     ...req.body,
//     name: "gele-bi",
//     createdAt: Date.now(),
//   });

//   return res.status(200).send(data);
// });

router.get("/secure-data", verifyOrigin, verifyJWTToken, (req, res) => {
  return res.status(200).json(mockData);
});

router.get("/data/:id", verifyOrigin, verifyJWTToken, (req, res) => {
  const { id } = req.params;

  console.log("id ==> ", id);
  return res.status(200).json(mockData);
});

export default router;

router.post(
  "/create/user",
  verifyOrigin,
  verifyJWTToken,
  async (req, res, next) => {
    try {
      // const {displayName, email, photoURL} = req.body;
      const { name, email, image } = req.body;

      const checkedUser = await findOne({
        data: {
          name,
          email,
        },
        collectionName: "users",
      });

      if (checkedUser) {
        return res.status(300).json({
          success: false,
          message: "user Already exist",
        });
      }

      const schema = {
        name,
        email,
        image,
      };
      const createdUser = await createOne({
        data: new User(schema),
        collectionName: "users",
      });

      console.log("createdUser ===> ", createdUser);

      return res.status(201).json({
        success: true,
        message: "user created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create/review",
  verifyOrigin,
  verifyJWTToken,
  async (req, res, next) => {
    try {
      // const {displayName, email, photoURL} = req.body;
      const {
        name,
        email,
        foodName,
        image,
        category,
        ratings,
        restaurantName,
        location,
        reviewText,
      } = req.body;

      const checkedUser = await findOne({
        data: {
          name,
          email,
        },
        collectionName: "users",
      });

      // console.log("checkedUser == ", checkedUser);

      const schema = {
        user: checkedUser._id,
        foodName,
        image,
        category,
        ratings,
        restaurantName,
        location,
        reviewText,
      };

      const createdReviews = await createOne({
        data: new Review(schema),
        collectionName: "reviews",
      });

      console.log("createdReviews ===> ", createdReviews);

      return res.status(201).json({
        success: true,
        message: "Review created!",
      });
    } catch (error) {
      next(error);
    }
  }
);

// user,
//   foodName,
//   image,
//   category,
//   ratings,
//   restaurantName,
//   location,
//   reviewText,
