# 🤖 AI Chatbot

An AI-powered chatbot built with **React (Vite)** for the frontend and **FastAPI** for the backend. The application is designed to support modern LLM integration (such as OpenAI, Ollama, or LlamaIndex) and provides a clean, responsive chat interface.

---
<img width="1179" height="880" alt="WhatsApp Image 2026-08-21 at 4 14 47 PM" src="https://github.com/user-attachments/assets/ae262258-a979-49dd-b4fc-17d9cfa1f046" />
<img width="361" height="674" alt="WhatsApp Image 2026-08-21 at 4 10 25 PM" src="https://github.com/user-attachments/assets/4b7feec7-4238-4c88-a319-28a53dd10702" />
<img width="351" height="678" alt="WhatsApp Image 2026-08-21 at 4 10 36 PM" src="https://github.com/user-attachments/assets/b0eb150b-1433-4b02-9ff3-ea48f51a5b67" />
<img width="368" height="681" alt="WhatsApp Image 2026-08-21 at 4 10 46 PM" src="https://github.com/user-attachments/assets/cf07e789-5cd7-46af-979e-91b45927381f" />
<img width="1600" height="899" alt="WhatsApp Image 2026-08-21 at 4 10 03 PM" src="https://github.com/user-attachments/assets/4240e4e4-83f4-4cf4-8b14-eba29ac8623d" />



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
uvicorn backend.app:app --reload
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

Open `http://localhost:5173` in your browser. Keep both terminals running.

### Run on your local network

To open the frontend from another device on the same Wi-Fi network:

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

Use the computer's local IP address with port `5173`, for example:
`http://192.168.1.10:5173`.

The backend must remain reachable at port `8000`, and Ollama must be running with
the selected model installed. For a public deployment, host the frontend and
backend separately and replace `VITE_API_BASE_URL` with the public backend URL.

### Deploy the frontend to GitHub Pages

This repository includes a GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. To enable it:

1. Push the workflow to the `main` branch.
2. Open the repository on GitHub and go to **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Open the completed workflow run to find the published Pages URL.

GitHub Pages hosts the React interface only. Chat requests still require a
public FastAPI backend and a server running Ollama; the local `127.0.0.1:8000`
address will not work for visitors to the Pages site.

### Connect Pages to the backend

1. Create a new **Web Service** on Render from this repository. Render can use
  `render.yaml`, or configure the service manually with the build command
  `pip install -r requirements.txt` and the start command
  `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`.
2. Confirm the backend works at `https://YOUR-SERVICE.onrender.com/health`.
3. Push a commit or rerun the Pages workflow. The rebuilt site will call Render
  instead of `127.0.0.1`.

Render cannot use Ollama installed on your personal computer. The backend now
supports any OpenAI-compatible hosted model API. In Render, set the secret
`OPENAI_API_KEY`, then set `OPENAI_BASE_URL` and `OPENAI_MODEL` for your chosen
provider. For OpenAI, use `https://api.openai.com/v1/chat/completions` and
`gpt-4o-mini`. Never put model API keys in frontend code or GitHub Pages
environment variables. If `OPENAI_API_KEY` is absent, local development falls
back to Ollama.

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
