import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";

import cors from "cors";
import db from "./config/config.js";
import colors from "colors";
import path from 'path';
import { fileURLToPath } from 'url';

//import { errorHandler } from "./middleware/error-handler.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { errorHandler } from "./middleware/error-handler.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser('access_token'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  path.join(__dirname, "../client/public/upload"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// database sync
db.sync()
  .then(() => {
    console.log("Generate Table".green);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`.yellow);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
  

  // global error handler
  app.use(errorHandler);

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;
