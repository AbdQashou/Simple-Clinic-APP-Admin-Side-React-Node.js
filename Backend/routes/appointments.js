import express from "express";
import pgClient from "../db.js";

const appointmentRoutes = express.Router();

// GET /api/appointments
appointmentRoutes.get("/", async (_req, res) => {
  const r = await pgClient.query("SELECT * FROM appointments ORDER BY id");
  res.json(r.rows);
});

// GET /api/appointments/:id
appointmentRoutes.get("/:id", async (req, res) => {
  const r = await pgClient.query("SELECT * FROM appointments WHERE id = $1", [req.params.id]);
  if (r.rows.length === 0) return res.status(404).json({ message: "Appointment not found" });
  res.json(r.rows[0]);
});

// POST /api/appointments  body: { doctor_id, date, time }
appointmentRoutes.post("/", async (req, res) => {
  const { doctor_id, date, time } = req.body;
  if (!doctor_id || !date || !time) return res.status(400).json({ message: "Missing fields" });

  const r = await pgClient.query(
    "INSERT INTO appointments (doctor_id, date, time) VALUES ($1, $2, $3) RETURNING *",
    [doctor_id, date, time]
  );
  res.status(201).json(r.rows[0]);
});

// PUT /api/appointments/:id   body: { date?, time? }  (update only these)
appointmentRoutes.put("/:id", async (req, res) => {
  const sets = [];
  const vals = [];
  let i = 1;

  if (req.body.date !== undefined) { sets.push(`date = $${i++}`); vals.push(req.body.date); }
  if (req.body.time !== undefined) { sets.push(`time = $${i++}`); vals.push(req.body.time); }

  if (sets.length === 0) return res.status(400).json({ message: "No fields to update" });

  vals.push(req.params.id);
  const q = `UPDATE appointments SET ${sets.join(", ")} WHERE id = $${i} RETURNING *`;
  const r = await pgClient.query(q, vals);
  if (r.rows.length === 0) return res.status(404).json({ message: "Appointment not found" });
  res.json(r.rows[0]);
});

// DELETE /api/appointments/:id
appointmentRoutes.delete("/:id", async (req, res) => {
  const r = await pgClient.query("DELETE FROM appointments WHERE id = $1 RETURNING *", [req.params.id]);
  if (r.rows.length === 0) return res.status(404).json({ message: "Appointment not found" });
  res.json({ message: "Appointment deleted", appointment: r.rows[0] });
});

export default appointmentRoutes;
