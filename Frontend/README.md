# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Solo Clinic — Frontend (React + Vite)

This is the frontend for a single-doctor clinic appointment system. There is no authentication. The interface allows adding appointments and viewing, updating (date/time only), and deleting them.

## Description

Screens:
- Welcomee — entry page with a button to manage appointments
- Manage — choose between VIEW (list and edit) or ADD
- Addd — create a new appointment (doctor, date, time)
- EditUpdate — list all appointments; update date/time only; delete appointment

The top navbar shows only “Home”.

## User Requirements

- From Welcomee, the doctor can navigate to Manage.
- From Manage, the doctor can:
  - Add: open Addd and submit a new appointment.
  - View: open EditUpdate to list, update (date/time only), or delete appointments.
- EditUpdate refreshes the list after save/delete. There are no pop-up alerts.

## Technologies

- React 18 with Vite
- Fetch API for HTTP requests
- Single shared stylesheet (`src/styles.css`)
- Simple screen state in `App.jsx`

## Getting Started

```bash
cd frontend
npm install
npm run dev

