import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import pgClient from "./db.js";
import doctorRoutes from "./routes/doctors.js";
import appointmentRoutes from "./routes/appointments.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

const port = process.env.PORT || 5000;

await pgClient.connect();
app.listen(port, () => console.log("server on :" + port));
