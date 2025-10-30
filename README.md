# Highway Delite – Adventure Experience Booking Platform

A full-stack web application for discovering and booking curated travel & adventure experiences across India.  
Users can browse available experiences, view available dates and time slots, apply promo codes, and confirm bookings — all in a modern, responsive interface.

---

## Features

### Frontend (React + TypeScript + Vite + TailwindCSS)
- Clean, responsive design matching Figma mockups  
- Dynamic routing (Home → Details → Checkout → Confirmation)  
- Functional search bar for filtering experiences  
- Real-time promo code validation and discount calculation  
- Interactive booking form with validation  
- Booking confirmation page showing all details  

### Backend (Node.js + Express + MongoDB)
- RESTful API endpoints for experiences, promo codes, and bookings  
- Seat capacity validation and prevention of overbooking  
- Dynamic pricing with quantity & promo discount support  
- Centralized MongoDB data models for Experience, Booking, and Promo  

---

## Folder Structure

```
BookIt/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    └── package.json
```

---

## Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | React (Vite + TypeScript) |
| Styling | Tailwind CSS |
| State Management | React Hooks |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| HTTP Client | Axios |

---

## API Endpoints

| Method | Endpoint               | Description                               |
| :----- | :--------------------- | :---------------------------------------- |
| `GET`  | `/api/experiences`     | Fetch all experiences                     |
| `GET`  | `/api/experiences/:id` | Fetch a single experience                 |
| `POST` | `/api/experiences`     | **Create a new experience (Postman use)** |
| `POST` | `/api/promo`           | **Create a new promo code (Postman use)** |
| `POST` | `/api/promo/validate`  | Validate promo code                       |
| `POST` | `/api/bookings`        | Create a booking                          |

---

## Example `.env.example`

```ini
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit
```

---

## 🧱 Installation

```bash
# Clone the repositories

# Frontend
git clone https://github.com/RupakDas62/BookIt-Frontend.git

# Backend
git clone https://github.com/RupakDas62/BookIt-Backend.git

# Install dependencies for both frontend and backend
npm install --prefix BookIt-Backend
npm install --prefix BookIt-Frontend

# Create .env file for backend
cp BookIt-Backend/.env.example BookIt-Backend/.env

# Add your MongoDB connection string in BookIt-Backend/.env

# Run backend
npm run dev --prefix BookIt-Backend

# Run frontend
npm run dev --prefix BookIt-Frontend


Then open your browser at **http://localhost:5173**

---

## Sample Booking Flow

1. Browse an experience on Home page  
2. View available dates & time slots  
3. Choose your preferred date and time  
4. Fill out details & optionally apply a promo code  
5. Confirm booking — data is stored in MongoDB and confirmation displayed  

---

## Sample API Response

### `POST /api/bookings`
**Request:**
```json
{
  "name": "Rupak Das",
  "email": "rupak@example.com",
  "experienceId": "6903153506ef67d65b71b42f",
  "slot": { "date": "2025-11-18", "time": "10:00 AM" },
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Booking confirmed",
  "booking": {
    "user": { "name": "Rupak Das", "email": "rupak@example.com" },
    "experienceId": "6903153506ef67d65b71b42f",
    "slot": { "date": "2025-11-18", "time": "10:00 AM" },
    "quantity": 2,
    "pricePerPerson": 7499,
    "totalPrice": 14998,
    "status": "confirmed"
  }
}
```

---

## Deliverables Summary

- Organized Next.js-like project folder (Vite React + Node.js)  
- `.env.example` included  
- README with setup & rendering rationale  
- Fully functional backend routes & integration  
- Frontend pages built and connected  

---
