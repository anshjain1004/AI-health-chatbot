import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ── Config ─────────────────────────────────────────────────
const USE_NEURAL_NETWORK = false;   // set true after running train_nn.py
const DB_FILE = path.join(__dirname, "chats.json");
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");

function saveChat(userMessage, botReply) {
  const chats = JSON.parse(fs.readFileSync(DB_FILE));
  chats.push({ userMessage, botReply, createdAt: new Date() });
  fs.writeFileSync(DB_FILE, JSON.stringify(chats, null, 2));
}

// ── Call Python model ──────────────────────────────────────
function callPythonModel(symptomText) {
  return new Promise((resolve, reject) => {
    const args = [
      path.join(__dirname, "predict.py"),
      symptomText,
      ...(USE_NEURAL_NETWORK ? ["--model", "nn"] : []),
    ];

    const py = spawn("python", args);
    let output = "";
    let errOutput = "";

    py.stdout.on("data", (d) => (output += d.toString()));
    py.stderr.on("data", (d) => (errOutput += d.toString()));

    py.on("close", (code) => {
      try {
        const result = JSON.parse(output.trim());
        if (result.error) reject(new Error(result.error));
        else resolve(result);
      } catch {
        reject(new Error(`Python error: ${errOutput || output}`));
      }
    });
  });
}

// ── Format response for frontend ──────────────────────────
function formatReply(result) {
  return `
🩺 Possible Conditions:
${result.disease}
(Model Confidence: ${result.confidence}% | ${result.model_type})

💊 Prevention Tips:
${result.prevention}

🍲 Diet Advice:
${result.diet}

🚨 Red Flags:
${result.red_flags}

❓ Follow-up Questions:
1. When did you first start noticing these symptoms?
2. On a scale of 1 to 10, how severe is your discomfort?
3. Have you taken any medication for this recently?

⚠️ Disclaimer: This is AI-generated health information for educational purposes only. Always consult a qualified doctor for actual diagnosis and treatment.
  `.trim();
}

// ── Fallback keyword engine (if model not trained yet) ────
const fallbackDB = [
  { keywords: ["fever","temperature","chills","sweating"], disease: "Viral Fever / Flu", prevention: "Stay hydrated, rest, paracetamol if needed", diet: "Warm soups, coconut water, tulsi tea", red_flags: "Fever >103°F, seizures, severe headache — see doctor" },
  { keywords: ["cough","cold","runny nose","sore throat"], disease: "Common Cold / URI", prevention: "Steam inhalation, warm saline gargle, avoid cold drinks", diet: "Honey-ginger tea, turmeric milk, warm fluids", red_flags: "Cough with blood, breathlessness — see doctor" },
  { keywords: ["headache","migraine","head pain","head ache"], disease: "Tension Headache / Migraine", prevention: "Stay hydrated, rest, dark quiet room", diet: "Water, magnesium-rich foods, avoid caffeine", red_flags: "Sudden thunderclap headache — emergency" },
  { keywords: ["stomach","abdominal pain","nausea","vomiting"], disease: "Gastritis / Food Poisoning", prevention: "Small meals, avoid spicy food, hand hygiene", diet: "ORS, banana, boiled rice, curd", red_flags: "Blood in vomit, severe pain — see doctor" },
  { keywords: ["diarrhea","loose motion","loose stool"], disease: "Gastroenteritis", prevention: "ORS, clean water, hand hygiene", diet: "BRAT diet, ORS, curd, coconut water", red_flags: ">6 loose motions/day, blood in stool — doctor urgently" },
  { keywords: ["chest pain","heart","palpitation","breathless"], disease: "Possible Cardiac / Respiratory Issue", prevention: "No smoking, control BP, regular exercise", diet: "Low salt low fat diet, omega-3, fruits vegetables", red_flags: "Crushing chest pain + arm/jaw pain — CALL 108 IMMEDIATELY" },
  { keywords: ["diabetes","sugar","blood sugar","glucose","thirst"], disease: "Diabetes", prevention: "Exercise daily, reduce sugar, monitor glucose", diet: "Low glycemic foods, whole grains, vegetables, avoid sweets", red_flags: "Glucose >300, confusion, fruity breath — urgent care" },
  { keywords: ["anxiety","stress","panic","worried","depression","sad"], disease: "Anxiety / Depression", prevention: "Meditation, exercise, social support, therapy", diet: "Omega-3, magnesium, Vitamin D, avoid caffeine alcohol", red_flags: "Thoughts of self-harm — seek immediate professional help" },
];

function fallbackResponse(message) {
  const msg = message.toLowerCase();
  let best = null, maxScore = 0;
  for (const entry of fallbackDB) {
    let score = entry.keywords.filter(k => msg.includes(k)).length;
    if (score > maxScore) { maxScore = score; best = entry; }
  }
  if (best && maxScore > 0) {
    return `
🩺 Possible Conditions:\n${best.disease}\n(Using fallback engine — train the model for better accuracy)\n\n💊 Prevention Tips:\n${best.prevention}\n\n🍲 Diet Advice:\n${best.diet}\n\n🚨 Red Flags:\n${best.red_flags}\n\n❓ Follow-up Questions:\n1. How long have you been experiencing these symptoms?\n2. Are there any specific triggers that make it worse?\n3. Have you tried any home remedies yet?\n\n⚠️ Disclaimer: Educational use only. Always consult a doctor.
    `.trim();
  }
  return `🩺 Possible Conditions:\nCould not identify from description.\n\n💊 Prevention Tips:\nRest, stay hydrated, monitor symptoms.\n\n🍲 Diet Advice:\nLight nutritious food and plenty of water.\n\n🚨 Red Flags:\nIf symptoms persist >2-3 days or worsen — consult a doctor.\n\n❓ Follow-up Questions:\n1. Could you describe your symptoms more specifically?\n2. When did you first notice this issue?\n3. Do you have any pre-existing health conditions?\n\n⚠️ Disclaimer: Educational use only.`;
}

// ── Check if model is trained ──────────────────────────────
function isModelTrained() {
  const mlExists = fs.existsSync(path.join(__dirname, "saved_model", "model.pkl"));
  const nnExists = fs.existsSync(path.join(__dirname, "saved_nn_model", "nn_model.keras"));
  return USE_NEURAL_NETWORK ? nnExists : mlExists;
}

// ── Routes ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "AI Health Backend Running 🚀",
    modelTrained: isModelTrained(),
    modelType: USE_NEURAL_NETWORK ? "Neural Network" : "Random Forest / Logistic Regression",
    instruction: isModelTrained()
      ? "Model is trained and ready!"
      : "⚠️ Run 'python train_ml.py' to train the model first.",
  });
});

app.get("/model-status", (req, res) => {
  const mlTrained = fs.existsSync(path.join(__dirname, "saved_model", "model.pkl"));
  const nnTrained = fs.existsSync(path.join(__dirname, "saved_nn_model", "nn_model.keras"));
  res.json({ mlTrained, nnTrained, activeModel: USE_NEURAL_NETWORK ? "nn" : "ml" });
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();
    if (!userMessage) return res.status(400).json({ error: "Message is empty" });

    // TEMPORARY BYPASS FOR PRESENTATION (Prevents Vercel 512MB Crash)
    // Directly use the fallback engine instead of spinning up Python
    console.warn("⚠️ Presentation Mode: Using keyword fallback engine");
    let botReply = fallbackResponse(userMessage);

    saveChat(userMessage, botReply);
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/history", (req, res) => {
  try {
    const chats = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(chats);
  } catch { res.json([]); }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🤖 Active model: ${USE_NEURAL_NETWORK ? "Neural Network" : "ML (Random Forest/LR)"}`);
  console.log(`📦 Model trained: ${isModelTrained() ? "✅ YES" : "❌ NO — run train_ml.py first"}\n`);
});