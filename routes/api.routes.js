import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import verifyOrigin from "../middlewares/allowOrigin.middleware.js";
import verifyJWTToken from "../middlewares/firebase.jwt.middleware.js";
import { createFood } from "../utils/mongodbCRUD.js";

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

router.post("/add-data", verifyOrigin, async (req, res) => {
  const data = await createFood({
    ...req.body,
    name: "gele-bi",
    createdAt: Date.now(),
  });

  return res.status(200).send(data);
});

router.get("/secure-data", verifyOrigin, verifyJWTToken, (req, res) => {
  return res.status(200).json(mockData);
});

router.get("/data/:id", verifyOrigin, verifyJWTToken, (req, res) => {
  const { id } = req.params;

  console.log("id ==> ", id);
  return res.status(200).json(mockData);
});

export default router;
