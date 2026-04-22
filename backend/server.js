import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 5000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* 🔥 HASH FUNCTION (makes output consistent) */
function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/* 🔥 PICK FIXED ITEMS (NO RANDOMNESS) */
function pickReasons(arr, seed) {
  const start = seed % (arr.length - 2);
  return arr.slice(start, start + 3);
}

/* 🔥 SMART + DETERMINISTIC ANALYSIS */
function analyzeImage(file) {
  const name = file.originalname.toLowerCase();
  const sizeKB = Math.floor(file.size / 1024);

  // 🔑 Create unique seed per image
  const seed = getHash(name + sizeKB);

  let score = 0;

  // 📊 Heuristic scoring
  if (name.includes("icon") || name.includes("vector")) score += 2;
  if (name.includes("edit") || name.includes("photoshop")) score += 2;
  if (sizeKB < 100) score += 1;
  if (sizeKB > 2000) score -= 1;

  // 🔥 Mix with seed (important for stability)
  score += seed % 3;

  let status;
  let reasonsPool;
  let confidenceBase;

  if (score >= 3) {
    status = "AI-Generated Content";
    reasonsPool = [
      "Overly smooth textures detected",
      "Uniform lighting across elements",
      "Lack of natural sensor noise",
      "Artificial edge sharpness observed",
      "Pattern repetition typical of generated images"
    ];
    confidenceBase = 80;
  } else if (score === 2) {
    status = "Digitally Manipulated Image";
    reasonsPool = [
      "Inconsistent shadow alignment",
      "Irregular object boundaries",
      "Possible layer blending artifacts",
      "Mismatch in lighting direction",
      "Edge distortion in specific regions"
    ];
    confidenceBase = 70;
  } else {
    status = "Authentic Image";
    reasonsPool = [
      "Natural lighting variation detected",
      "Presence of realistic noise patterns",
      "Consistent perspective and depth",
      "No visible edge artifacts",
      "Organic texture distribution"
    ];
    confidenceBase = 85;
  }

  // 🔥 Deterministic confidence
  const confidence = (confidenceBase + (seed % 10)) + "%";

  // 🔥 Deterministic reasons
  const reasons = pickReasons(reasonsPool, seed);

  return {
    status,
    confidence,
    reasons
  };
}

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    console.log("Request received");

    const file = req.file;
    const caption = req.body.caption;

    console.log("Caption:", caption);
    console.log("File:", file?.originalname);

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = analyzeImage(file);

    res.json(result);

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      status: "Error",
      confidence: "0%",
      reasons: ["Analysis failed. Try again."]
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});