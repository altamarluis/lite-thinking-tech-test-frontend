# Lite Thinking – Technical Test (Frontend)

Frontend application for the **Lite Thinking Technical Test**, built with React and Tailwind CSS.  
Consumes a Django REST API to manage companies, products, inventory, reports, and AI-powered summaries.

---

## 🚀 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **JWT Authentication**
- **Atomic Design** (Atoms, Molecules, Organisms)
- **REST API integration**

---

## 📦 Project Setup

### Prerequisites
- Node.js ≥ 18
- npm

### Installation
```bash
npm install
```

### Run in development
```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

---

## ⚙️ Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🔐 Authentication & Roles

Authentication is handled using **JWT**, stored and managed via `AuthContext`.

### Roles

- **Admin**
  - Manage companies
  - Create products
  - Add/remove inventory items
  - Download inventory PDF
  - Send inventory report by email
  - Generate AI inventory summary

- **External User**
  - View companies
  - View inventory and reports

### Demo Credentials

| Role     | Username | Password   |
|----------|----------|------------|
| Admin    | admin    | Test1234!  |
| External | user     | User1234!  |

---

## 📊 Main Features

- Companies management
- Products with multi-currency prices
- Inventory per company
- PDF generation (downloaded from backend)
- Send inventory report via email
- **AI Feature**  
  Generates a natural language summary of the entire inventory via backend integration.

---

## 🧠 Architecture Notes

- UI follows **Atomic Design**:
  - `atoms`: basic UI components
  - `molecules`: composed UI blocks
  - `organisms`: complex UI sections
- Pages act as orchestration layers (API + UI).
- No business logic in frontend; all rules handled by backend.

---

## 📁 Project Status

- Frontend implemented as part of a technical hiring test
- Integrated with backend API
- Focused on clarity, maintainability, and evaluation criteria

---

## 📌 Notes for Reviewers

- This repository contains **only the frontend**.
- Backend details (email provider, AI provider, PDF generation) are documented in the backend repository.
- The frontend intentionally avoids overengineering to prioritize readability and correctness.