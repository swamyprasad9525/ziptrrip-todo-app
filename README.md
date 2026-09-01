# TaskFlow - Premium Todo Application

TaskFlow is a premium, advanced Todo application built for the Ziptrrip challenge. It features a modern, highly attractive glassmorphism UI and strictly adheres to the Multiple Page Application (MPA) architecture requirements.

## 🚀 Features & Functionalities

### Frontend (Multiple Page Application)
- **True MPA Architecture**: The app is built with Vite using multiple HTML entry points (`index.html` and `todo.html`). Navigation between the list page and detail page triggers a full browser page reload, entirely avoiding SPA behavior (`react-router-dom` has been removed).
- **Premium Glassmorphism UI**: Uses a sleek, dark-themed, translucent UI design with vibrant gradients, custom scrollbars, and fluid micro-animations on hover/click states.
- **Advanced Layout**: Responsive grid layouts and Flexbox ensure the application looks stunning on both desktop and mobile devices.
- **Dashboard Stats**: Real-time counters at the top displaying total, active, and completed tasks.
- **Filtering & Search**:
  - Filter tasks by "All", "Active", or "Completed".
  - Search tasks dynamically by their title (case-insensitive).
- **Todo List Page**: Displays all tasks with options to quickly toggle completion status, view details, or delete.
- **Todo Detail Page**: Dedicated page (`/todo.html?id=...`) to view and edit a specific task in detail. Editable fields include Title, Description, Priority (Low, Medium, High), and Due Date.

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations via Express.js.
- **Database Storage**: Data is persistently saved in MongoDB.
- **Robust Validation**: Server-side validation using Mongoose models (ensures required fields, truncates long titles, enforces priority enums).
- **Search Capabilities**: Endpoint natively supports regex search queries for task titles.

## 🛠 Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder and add your MongoDB connection string:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server: `npm start` (or `npm run dev` for nodemon). The server will run on port 5000.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. The frontend will typically run on `http://localhost:3000`.

## 📜 Architectural Decisions
- **Why Vite for MPA?**: Vite provides an excellent developer experience and seamlessly supports multi-page configurations via Rollup options, allowing us to generate multiple `.html` files in production and mimic traditional multi-page navigation.
- **Styling approach**: Standard CSS (`index.css`) was utilized with CSS variables and modern properties (`backdrop-filter`) to maximize aesthetic control without relying on massive utility libraries.