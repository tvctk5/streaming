import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

import { streamJSON } from "./utils/stream.js";

const app = express();
app.use(cors());

const readJSON = (file) => {
  const fullPath = path.join(process.cwd(), "data", file);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
};

app.get("/", (req, res) => {
  res.send("Streaming mock API running");
});

// === Mock API STREAMING ===
app.get("/v1/stream", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");
  res.flushHeaders();

  const chunks = [
    { id: "1", delta: "Hello" },
    { id: "2", delta: " there" },
    { id: "3", delta: ", this" },
    { id: "4", delta: " is" },
    { id: "5", delta: " streamed" },
    { id: "6", delta: " content." }
  ];

  for (const chunk of chunks) {
    res.write(JSON.stringify(chunk) + "\n");
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  res.write(JSON.stringify({ done: true }) + "\n");
  res.end();
});

app.get("/v1/learning_objective", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");
  res.flushHeaders();

  const data = readJSON("learning_objective.json");
  await streamJSON(res, data, 20);
});

app.get("/v1/recommendation", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");
  res.flushHeaders();

  const data = readJSON("recommendation.json");
  await streamJSON(res, data, 15);
});

app.get("/v1/question_generation", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");
  res.flushHeaders();

  const data = readJSON("question_generation.json");
  await streamJSON(res, data, 10);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Streaming server running on " + port);
});
