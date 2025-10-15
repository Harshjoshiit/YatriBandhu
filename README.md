# YatriBandhu 🚆

**YatriBandhu** is a full-stack MERN application that simplifies train seat exchanges for Indian Railways passengers.  
It enables travelers to upload their ticket PDFs or manually enter details, find other passengers willing to exchange seats in the same coach, and chat with them in real-time.

---

Live Demo: http://yatri-bandhu.vercel.app

## 🚀 Features

- **User Authentication** – Secure login/signup using JWT tokens  
- **Ticket Upload & Parsing** – Upload ticket PDFs parsed via Groq API (custom prompt-based extraction)  
- **Seat Exchange System** – Intelligent matching based on train and coach number  
- **Real-Time Chat** – Live communication using Socket.IO with:
  - Typing indicator  
  - Block/unblock functionality  
- **Email Notifications** – Email alerts (via Email.js) when a new message is received  
- **Dashboard** – View ticket history, notifications, and chat requests  
- **Modern UI/UX** – Built with React + Tailwind CSS  
- **Deployment** –  
  - Frontend: [Vercel](https://vercel.com/)  
  - Backend: [Render](https://render.com/)  
- **Database** – MongoDB (Mongoose ODM)

---

## 🧱 Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS  
**Backend:** Node.js, Express.js, Socket.IO  
**Database:** MongoDB  
**Utilities:** Groq API (PDF parsing), Email.js (notifications)

---
## Clone the repository
git clone https://github.com/Harshjoshiit/YatriBandhu.git

---
## Install Dependencies

cd client  
npm install  

cd ../server  
npm install  

---

## Run Client and Server

# Run frontend  
cd client  
npm run dev  

# Run backend  
cd ../server  
npm start  

---


