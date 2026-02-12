import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Resend } from "resend";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL,
  }),
);

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/accepted", async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ifa010906@gmail.com",
      subject: "SHE SAID YES! 💍💖",
      html: "<h1>CONGRATULATIONS! 🥳</h1><p>She accepted the proposal. Time to celebrate and buy ring!</p>",
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ msg: "Sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Error sending mail" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});
