# clinic-api
# Solo Clinic — Backend (Express + PostgreSQL)

This is the backend API for the Solo Clinic application. It exposes JSON endpoints to create, list, update (date/time only), and delete appointments, plus an optional doctors list used by the Addd page. There is no authentication.

---

## Tech Stack

- Node.js with Express
- PostgreSQL via `pg`
- `dotenv`, `cors`, `morgan`
- ES Modules (`"type": "module"`)

---

## Getting Started

```bash
cd backend
npm install
PORT=5000
DATABASE_URL=postgresql://postgres:0000@localhost:5432/clinicdb
psql -U postgres -d clinicdb -f schema.sql
npm run dev
# or
npm start
backend/
├── server.js            # entry point; connects once; mounts routes
├── db.js                # pg Client (uses DATABASE_URL)
├── routes/
│   ├── appointments.js  # CRUD for appointments (PUT updates date/time only)
│   └── doctors.js       # GET list of doctors (for dropdown)
├── schema.sql           # schema + seed data for doctors and appointments
└── .env                 # environment variables (PORT, DATABASE_URL)
# List all appointments
curl -i http://localhost:5000/api/appointments

# Get one appointment (id = 1)
curl -i http://localhost:5000/api/appointments/1

# Create a new appointment
curl -i -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"doctor_id":1,"date":"2025-09-15","time":"14:00"}'

# Update appointment date/time only (id = 1)
curl -i -X PUT http://localhost:5000/api/appointments/1 \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-09-16","time":"09:30"}'

# Delete appointment (id = 1)
curl -i -X DELETE http://localhost:5000/api/appointments/1

# List doctors (optional)
curl -i http://localhost:5000/api/doctors
