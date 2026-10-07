# CSPML Lab 5 – Digital Communication AI Teaching Assistant

## Project Description

This project is an AI-based Teaching Assistant for Digital Communication Systems.

Students can ask questions through a web interface.

The backend sends the question to a Hugging Face Large Language Model along with subject-specific instructions stored in `context/context.md`.

The AI generates a simple explanation followed by examples, important points, quiz questions and flashcards.

## Technologies Used

* Python
* FastAPI
* HTML
* CSS
* JavaScript
* Hugging Face API
* Git
* GitHub

## Project Structure

```text
CSPML_LAB5_AI_TA
│
├── backend
│   └── main.py
│
├── context
│   └── context.md
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── README.md
└── PROJECT_PLAN.md
```

## Configuration

Create a `.env` file in the project root.

Add:

```text
HF_TOKEN=your_hugging_face_token
```

Do not share the API key.

## Installation

Create and activate a Python virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the required packages:

```powershell
pip install fastapi uvicorn requests python-dotenv
```

## Run Backend

Open a terminal in:

```text
backend
```

Run:

```powershell
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

## Run Frontend

Open another terminal in:

```text
frontend
```

Run:

```powershell
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500
```

## API Testing

FastAPI documentation is available at:

```text
http://127.0.0.1:8000/docs
```

The main endpoint is:

```text
POST /ask
```

Example request:

```json
{
    "question": "Explain BPSK in simple terms."
}
```

## Security

The Hugging Face API key is stored in `.env`.

The `.env` file must never be uploaded to GitHub.

The `.gitignore` file prevents `.env` from being tracked.

## Main Features

* Digital Communication Systems question answering
* Subject-specific context
* Beginner-friendly explanations
* Step-by-step numerical solutions
* Examples
* Quick quizzes
* Flashcards
* Web-based interface
