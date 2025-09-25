import { useEffect, useState } from "react";

const EditUpdate = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: "", time: "" });

  const load = () => {
    fetch("http://localhost:5000/api/appointments")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  };

  useEffect(() => { load(); }, []);

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({ date: row.date || "", time: row.time || "" });
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    const res = await fetch(`http://localhost:5000/api/appointments/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: form.date, time: form.time }),
    });

    if (res.ok) {
      setEditingId(null);
      load();
    }
  };

  const remove = async (id) => {
    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) load();
  };

  return (
    <>
      <h2 className="page-title">View & Edit</h2>
      <p className="page-sub">All appointments are listed below.</p>

      <div className="list">
        {items.map((a) => (
          <div key={a.id} className="item">
            <div className="item-main">
              <div><strong>{a.date} {a.time}</strong></div>
              <div className="item-meta">Doctor ID: {a.doctor_id ?? "-"}</div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => startEdit(a)}>Update</button>
              <button className="btn" onClick={() => remove(a.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="edit-box">
          <form className="form" onSubmit={save}>
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
              <button className="btn btn-primary" type="submit">Save</button>
              <button className="btn" type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUpdate;
