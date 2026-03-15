import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Chat from "./models/Chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully ✅"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// Test route
app.get("/", (req, res) => {
  res.send("AI Health Backend Running 🚀");
});

// 🔥 CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const botReply = `
🩺 Possible Conditions:
Viral Fever, Flu

💊 Prevention Tips:
Stay hydrated, take rest.

🍲 Diet Advice:
Light food and warm fluids.

🚨 Red Flags:
Consult doctor if symptoms worsen.
    `;

    const newChat = new Chat({
      userMessage,
      botReply,
    });

    await newChat.save();

    res.json({ reply: botReply });

  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});