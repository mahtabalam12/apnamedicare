# ApnaMedicare - Full-Stack Healthcare Management & E-Commerce Platform

ApnaMedicare is a modern, comprehensive, and premium full-stack healthcare web application designed to bridge the gap between patients, doctors, and pharmacies. The application features user authentication, a personalized patient dashboard, doctor profiles with appointment scheduling, a fully interactive pharmacy e-commerce store with an integrated shopping cart, and a digital vault for medical prescriptions.

---

## 🛠️ Technology Stack & Tools

The project is architected as a monorepo split into a React-based frontend and a Node.js/Express-based backend.

### 🌐 Frontend (Client-side)
* **Framework:** React 19 (Functional components, hooks, custom context state management)
* **Build Tool:** Vite (Ultra-fast Hot Module Replacement & production bundler)
* **Styling:** Tailwind CSS v4.0 (Custom curated color palettes, elegant slate base, responsive layouts)
* **Animations:** Framer Motion (Smooth page transitions, layout animations, and hover micro-interactions)
* **Icons:** Lucide React (Clean vector iconography)
* **Routing:** React Router DOM v7 (Nested routes, layout protection, dynamic parameter passing)
* **State Management:** React Context API (`AuthContext` for global session sync and profile management)

### 🔌 Backend (Server-side)
* **Runtime Environment:** Node.js
* **Framework:** Express.js (REST API endpoints structure, error handling, route matching)
* **Database:** MongoDB Atlas (Cloud database instance)
* **ODM:** Mongoose (Schemas, model validations, query building)
* **Security & Auth:**
  * **bcryptjs:** Hashing and salting user passwords.
  * **jsonwebtoken (JWT):** Secure session-tokens generation and state preservation.
* **CORS:** Cross-Origin Resource Sharing enabled for seamless frontend-backend communication.
* **Development Utilities:** Nodemon (Auto-reloading dev environment)

---

## ✨ Core Features & Modules

### 1. 🔐 Authentication & Session Security
* **User Registration:** Secure register layout saving user fields into MongoDB with salted password hashes.
* **User Login:** Authenticates credentials, generates JWT tokens, and preserves user data locally.
* **Session Persistence:** `AuthContext` syncs user session status with the MongoDB database on page reload to guarantee accurate client profile caching.
* **Forgot Password:** Safe reset page allowing users to update their credentials securely.

### 2. 📊 Personalized Patient Dashboard
* **Dynamic Greetings:** Displays name and custom welcoming context based on user data.
* **Vital Health Metrics:** Quick cards showing active parameters:
  * Number of upcoming appointments
  * Count of active prescriptions
  * Dynamic Health Score progress indicator
* **Live Schedule Tracker:** Interactive feed highlighting consultation information (Doctor name, Specialty, Date, Time, and Status badge).
* **Care Plan Tracker:** Personalized care routines (e.g., Daily medicine timings and weekly physical therapy schedules).

### 3. 👨‍⚕️ Doctor Listing & Consultation Scheduling
* **Consultation Board:** Categorized directory of expert medical professionals (e.g., Cardiologist, Neurologist, Pediatrician, Dermatologist).
* **Doctor Profiles:** Individual profile pages detailing qualifications, experience, location, consultation fees, review count, rating stars, and bio.
* **Appointment Booking Scheduler:** Custom booking UI to schedule online or offline appointments by specifying dates and timings.
* **Consultations Management:** Page listing all active/past appointments, with a functional "Cancel Appointment" capability that deletes entries from the database.

### 4. 💊 Digital Pharmacy E-Commerce Store
* **Medicine Catalog:** Organized category-wise filter system (Vitamins, Pain Relief, Cold & Flu, Antibiotics, Digestive Health, Allergy).
* **Live Search Filter:** Instant matching against item names or categories.
* **Interactive Shopping Cart Drawer:**
  * Floating panel displaying added products.
  * Quantity adjusters (Plus/Minus/Delete) dynamically re-calculating math.
  * Math Breakdown: Subtotal, Discount percentage deductions, shipping costs (with free shipping eligibility alert for orders > ₹50).
* **Order Processing API:** Seamless checkout registering items, prices, quantities, and final total amounts inside the database.
* **My Orders History:** Tracking panel where patients inspect their past medicine purchase entries and processing statuses.

### 5. 📂 Digital Prescriptions Vault
* **Auto-Seeding Mechanism:** Backend automatically generates standard dummy prescriptions upon the first login of a new user to populate their records.
* **Vault Display:** Overview of current medical diagnoses, consulting doctors, diagnostics dates, and listed medicines.
* **PDF Downloader:** Integrated flow setup to export digital prescriptions offline.

### 6. 👤 User Profile & Custom Settings
* **Medical Identity Card:** View detailed patient stats: Age, Gender, Blood Group, Phone, Address, and avatar.
* **Interactive Profile Editor:** Custom inputs to modify personal address, contact, and profile fields (instantly synced to database and session state).
* **Security Settings:** Control panel to handle credential configurations.

---

## 📁 Project Directory Structure

```text
medicare/
│
├── backend/
│   ├── node_modules/          # Backend dependencies
│   ├── .env                   # DB configuration and Port setup
│   ├── server.js              # Entrypoint, DB models, REST API controllers
│   ├── package.json           # Scripts and Backend dependencies list
│   └── package-lock.json
│
└── frontend/
    ├── src/
    │   ├── assets/            # Static assets
    │   ├── components/        # Reusable view components
    │   │   ├── common/        # Shared components (BackButton, etc.)
    │   │   └── home/          # Landing page sub-sections (FAQ, Services, Hero, etc.)
    │   ├── context/           # React Context API providers (AuthContext)
    │   ├── layouts/           # Custom UI Layouts (Main, Auth, Dashboard)
    │   ├── pages/             # Page components (Appointments, Medicines, Profile, etc.)
    │   ├── App.jsx            # Core router mapping endpoints
    │   ├── main.jsx           # Client mounting entrypoint
    │   ├── index.css          # Styling stylesheet
    │   └── config.js          # API Server configuration URI mapping
    │
    ├── index.html             # Document landing
    ├── package.json           # Frontend scripts and Vite configurations
    ├── vite.config.js         # Build tooling presets
    └── tailwind.config.js     # Styles customization configuration
```

---

## 🚀 Getting Started & Setup Guide

To run this application locally, follow these simple setup steps:

### ⚙️ Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system. A running **MongoDB** cluster (local or Atlas) is required.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/[your-username]/apnamedicare.git
cd apnamedicare
```

### 2️⃣ Configure the Backend
* Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
* Create a `.env` file in the root of the backend folder and insert your environment parameters:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medicare
  PORT=5000
  JWT_SECRET=your_jwt_secret_key_here
  ```
* Install dependencies and run the server:
  ```bash
  npm install
  npm run dev
  ```
  The backend server should start running at `http://localhost:5000`.

### 3️⃣ Configure the Frontend
* Navigate to the `frontend` directory:
  ```bash
  cd ../frontend
  ```
* Install UI dependencies:
  ```bash
  npm install
  ```
* Run the Vite development server:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` (or the port specified in terminal) in your browser to view ApnaMedicare.

---

## 🤝 Contribution Guidelines
Contributions, bug reports, and pull requests are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewAmazingFeature`).
3. Commit your changes (`git commit -m 'Add some NewAmazingFeature'`).
4. Push to the Branch (`git push origin feature/NewAmazingFeature`).
5. Open a Pull Request.

---

*Made with ❤️ by [Mahtab Alam](https://github.com/mahtabalam12)*
