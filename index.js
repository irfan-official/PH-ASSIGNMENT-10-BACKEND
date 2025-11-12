import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import ApiRouter from "./routes/api.routes.js";
import connectDB from "./connections/mongodb.connection.js";
import cookieParser from "cookie-parser";
import allowedOrigins from "./config/allowOrigin.config.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const url =
  process.env.ENVIRONMENT === "local"
    ? `http://localhost:${port}`
    : process.env.HOST_URL;

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Hit 0");
  return res.status(200).json({
    message: "hello",
  });
});

app.use("/api/v1/", ApiRouter);

app.use((err, req, res, next) => {
  console.log("Error ==> ", err.message);
  return res.status(404).json({
    success: false,
    message: err.message,
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`server started at ${url}`);
});
