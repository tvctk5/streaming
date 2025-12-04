import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Streaming mock API is running");
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Streaming API running on port " + port);
});
