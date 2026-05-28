# AI Health Chatbot

## Project Title and Brief Description
**AI Health Chatbot** is a full-stack, AI-powered health symptom checker designed to provide preliminary medical insights based on user-described symptoms. The application uses a conversational interface to gather symptom data and returns potential conditions, prevention tips, diet advice, and critical red flags. The project features secure user authentication and maintains a personalized chat history, utilizing both predictive Python-based machine learning models and a robust keyword-based fallback engine.

## Technology Stack and Tools Used

### Frontend
* **React 19** (initialized with Vite)
* **Tailwind CSS** (for responsive, modern styling)
* **Framer Motion** (for smooth UI animations and transitions)
* **React Router DOM** (for protected routing and navigation)
* **Axios** (for API communication)

### Backend
* **Node.js & Express.js** (REST API server)
* **JSON Web Tokens (JWT) & bcryptjs** (for secure user authentication and password hashing)
* **File System (fs)** (for lightweight JSON-based data storage: `users.json`, `chats.json`)

### AI / Machine Learning
* **Python** (for running ML inference)
* **Scikit-learn / Keras** (Random Forest / Neural Network implementations)
* **Custom Keyword Fallback Engine** (ensures continuous operation and quick responses)

## Features and Functionalities Implemented
* **User Authentication System:** Secure Sign-Up and Log-In functionality with JWT-based protected routes.
* **Intelligent Symptom Analysis:** Processes user symptoms to output probable conditions, dietary recommendations, and immediate red flags to watch out for.
* **Dual AI Architecture:** Uses a Python-based ML prediction model with a built-in Javascript keyword fallback engine for high reliability.
* **Personalized Chat History:** Automatically saves conversation context tied to the logged-in user.
* **Modern UI/UX:** A highly responsive, aesthetically pleasing interface with dynamic animations, "thinking" delays, and structured follow-up flows.

## Installation/Execution Steps to Run the Project

### Prerequisites
* Node.js (v18+ recommended)
* Python 3.x (if training or running the full ML model locally)

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd ai-health-backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   # Server will start on http://localhost:5000
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ai-health-chatbot
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   # Frontend will be accessible at http://localhost:5173
   ```

## Team Members and Project Screenshots/Outputs

### Team Members
* Anshul Pandey EN23CS301162
* Ansh Jain EN23CS301151
* Chandraprakash Patidar EN24CS3L10005

### Project Screenshots

**Login/Signup Screen:**
<img width="720" height="937" alt="image" src="https://github.com/user-attachments/assets/4e1dbcd3-f0ba-4ca3-a396-d4082c5d9830" />

**Chat Interface:**
<img width="984" height="802" alt="WhatsApp Image 2026-05-28 at 07 06 57" src="https://github.com/user-attachments/assets/1818c3aa-92f8-42db-a21e-dca1422bfb67" />

