import express from "express";
import pgClient from "../db.js";

const doctorRoutes = express.Router();

// GET /api/doctors
doctorRoutes.get("/", async (_req, res) => {
  const r = await pgClient.query(
    "SELECT id, name, specialization, age FROM doctors ORDER BY id"
  );
  res.json(r.rows);
});


export default doctorRoutes;
