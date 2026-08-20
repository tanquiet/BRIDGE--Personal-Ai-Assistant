# 🤖 AI Chatbot

An AI-powered chatbot built with **React (Vite)** for the frontend and **FastAPI** for the backend. The application is designed to support modern LLM integration (such as OpenAI, Ollama, or LlamaIndex) and provides a clean, responsive chat interface.

---

## 🚀 Features

* 💬 Modern chat interface built with React
* ⚡ FastAPI backend for high-performance APIs
* 🔗 REST API communication between frontend and backend
* 🧠 Ready for LLM integration (OpenAI, Ollama, LlamaIndex, etc.)
* 📱 Responsive and clean UI
* 🔄 Easy to extend with RAG, conversation history, authentication, and more

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* FastAPI
* Python
* Uvicorn

---

## 📂 Project Structure

```text
CHATBOT/
│
├── backend/
│   ├── routes/
│   ├── chatbot.py
│   └── app.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── main.py
├── requirements.txt
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/tanquiet/CHATBOT.git
cd CHATBOT
```

---

### 2. Create a virtual environment

```bash
python -m venv chatbot_env
```

Activate it:

#### Windows

```bash
chatbot_env\Scripts\activate
```

#### Linux / macOS

```bash
source chatbot_env/bin/activate
```

---

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## ▶️ Running the Application

### Start the backend

From the project root:

```bash
uvicorn main:app --reload
```

The backend runs on:

```
http://127.0.0.1:8000
```

---

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoint

### POST `/chat`

Example request:

```json
{
  "message": "Hello!"
}
```

Example response:

```json
{
  "response": "Hello! How can I help you today?"
}
```

---

## 📸 Screenshots

Add screenshots of your chatbot UI here.

---

## 🔮 Future Improvements

* Streaming AI responses
* Conversation history
* Authentication and user accounts
* File upload support
* Retrieval-Augmented Generation (RAG)
* Vector database integration
* Dark mode
* Docker support
* Deployment to Vercel and Render

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Tanish**

GitHub: https://github.com/tanquiet
