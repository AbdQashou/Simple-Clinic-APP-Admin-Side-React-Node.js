import { useEffect, useState } from "react";

const Addd = ({ onCancel, onSaved }) => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor_id: "", date: "", time: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => (Array.isArray(data) ? setDoctors(data) : setDoctors([])))
      .catch(() => setDoctors([]));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.doctor_id || !form.date || !form.time) return;

    const res = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctor_id: Number(form.doctor_id),
        date: form.date,
        time: form.time,
      }),
    });

    if (res.ok) {
      setForm({ doctor_id: "", date: "", time: "" });
      onSaved && onSaved();
    }
  };

  return (
    <>
      <h1 className="page-title">Add Appointment</h1>
      <p className="page-sub">Fill the fields below then click Add.</p>

      <form className="form" onSubmit={submit}>
        <div className="field">
          <label className="label">Doctor</label>
          {doctors.length ? (
            <select
              className="select"
              name="doctor_id"
              value={form.doctor_id}
              onChange={onChange}
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          ) : (
            <input
              className="input"
              name="doctor_id"
              placeholder="Doctor ID"
              value={form.doctor_id}
              onChange={onChange}
            />
          )}
        </div>

        <div className="field">
          <label className="label">Appointment Date</label>
          <input
            className="input"
            name="date"
            value={form.date}
            onChange={onChange}
            placeholder="Enter Date..."
          />
        </div>

        <div className="field">
          <label className="label">Appointment Time</label>
          <input
            className="input"
            name="time"
            value={form.time}
            onChange={onChange}
            placeholder="Enter Time..."
          />
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit">Add</button>
          <button className="btn" type="button" onClick={onCancel}>Back</button>
        </div>
      </form>
    </>
  );
};

export default Addd;
