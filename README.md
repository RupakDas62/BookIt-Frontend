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

## Live URLs

| Type | URL |
|------|-----|
| **Frontend (Deployed)** | [https://bookit-client-rupak-das-projects.vercel.app/](https://bookit-client-rupak-das-projects.vercel.app/) |
| **Backend (Deployed)** | [https://bookit-backend-dgxp.onrender.com/](https://bookit-backend-dgxp.onrender.com/) |
| **Frontend Repository** | [https://github.com/RupakDas62/BookIt-Frontend](https://github.com/RupakDas62/BookIt-Frontend) |
| **Backend Repository** | [https://github.com/RupakDas62/BookIt-Backend](https://github.com/RupakDas62/BookIt-Backend) |

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

## Postman Collection

A **Postman collection (`BookIt.postman_collection.json`)** has been added for easy API testing.  
You can import it directly into Postman to test all backend endpoints — including experiences, promo validation, and booking creation.

---

## Environment Setup

### Example `.env.example`
```ini
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit
```

---

## Installation

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

add .env file in frontend and add VITE_API_BASE_URL

# Add your MongoDB connection string in BookIt-Backend/.env

# Run backend
npm run dev --prefix BookIt-Backend

# Run frontend
npm run dev --prefix BookIt-Frontend
```

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

- Organized Vite React + Node.js full-stack structure  
- `.env.example` included  
- Clear README with setup & environment instructions  
- Fully functional backend routes and frontend integration  
- Complete booking flow tested end-to-end  

---
