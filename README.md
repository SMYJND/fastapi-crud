 🧮 Mini Sales Prediction Dashboard

This is a simple proof-of-concept Sales Dashboard built as part of a developer evaluation task. It demonstrates basic CRUD functionality, frontend-backend integration, and a clean UI layout using React, Tailwind CSS, and FastAPI.

---

 🔧 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Storage:** In-memory list (no database used)

---

 ✨ Features

✅ Frontend (React + Tailwind CSS)
- Dashboard layout with a simple sidebar.
- Sales Table with:
  - Date, Product Name, Customer, Amount.
  - Responsive layout with scroll support for overflow.
- Form to add new sales:
  - Input validation on all fields (date, product, customer, amount).

✅ Backend (FastAPI)
- `GET /sales` – Fetches all sales records.
- `POST /sales` – Adds a new sale to the in-memory list.
- CORS configured for frontend communication.

---

📦 How to Run

🔁 Backend (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Create and activate a virtual environment:
   ```bash
    python -m venv venv
    source venv/bin/activate  # For Linux/macOS
    venv\Scripts\activate     # For Windows

3. Install dependencies:
    ```bash
    pip install fastapi uvicorn

4. Run the server:
    ```bash
    uvicorn main:app --reload

🌐 Frontend (React + Tailwind CSS)

1. Navigate to the frontend directory:
    ```bash
    cd frontend

2. Install dependencies:
    ```bash
    npm install

4. Start the development server:
    ```bash
    npm run dev

5. Visit http://localhost:5173 to view the dashboard.

Notes
-This app uses in-memory data only. Restarting the server will reset the sales list.
-Form input is validated on the client side before submission.




