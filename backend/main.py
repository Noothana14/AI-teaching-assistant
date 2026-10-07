from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

import requests
import os

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


# --------------------------------
# Project paths
# --------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
CONTEXT_DIR = os.path.join(BASE_DIR, "context")


# --------------------------------
# Load environment variables
# --------------------------------

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# --------------------------------
# Load subject context
# --------------------------------

def load_context():

    context_path = os.path.join(
        CONTEXT_DIR,
        "context.md"
    )

    with open(context_path, "r", encoding="utf-8") as file:
        return file.read()


CONTEXT = load_context()


# --------------------------------
# Create FastAPI application
# --------------------------------

app = FastAPI(
    title="CSPML Lab 5 - Digital Communication AI TA"
)


# --------------------------------
# Allow frontend connection
# --------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# --------------------------------
# Serve frontend files
# --------------------------------

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)


# --------------------------------
# Groq API
# --------------------------------

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"


# --------------------------------
# Student question format
# --------------------------------

class Question(BaseModel):

    question: str


# --------------------------------
# Home page
# --------------------------------

@app.get("/")
def home():

    return FileResponse(
        os.path.join(FRONTEND_DIR, "index.html")
    )


# --------------------------------
# Optional app route
# --------------------------------

@app.get("/app")
def app_page():

    return FileResponse(
        os.path.join(FRONTEND_DIR, "index.html")
    )


# --------------------------------
# Ask endpoint
# --------------------------------

@app.post("/ask")
def ask_question(data: Question):

    if not GROQ_API_KEY:

        return {
            "error": "Groq API key not found."
        }


    headers = {

        "Authorization": f"Bearer {GROQ_API_KEY}",

        "Content-Type": "application/json"
    }


    system_prompt = f"""
You are an AI teaching assistant for Digital Communication Systems.

Use the subject context provided below.

================ SUBJECT CONTEXT ================

{CONTEXT}

================ END CONTEXT ====================


Your teaching rules:

1. Start with a simple "Basic Idea".
2. Assume the student may be a beginner.
3. Explain technical words.
4. Use simple language.
5. Use examples whenever useful.
6. Do not introduce complicated formulas unnecessarily.
7. When using formulas, explain every symbol.
8. For numerical problems, show the solution step by step.
9. Make mathematical notation easy to read.
10. Do not use unnecessarily advanced notation.
11. End conceptual answers with:
    - Important Points
    - Quick Quiz with 2–3 questions
    - 3–5 easy Flashcards
12. Do not give quiz answers unless the student asks.
13. Stay focused on Digital Communication Systems.

Make the response easy for a student to understand and revise.

IMPORTANT FORMATTING RULES:

- Use simple plain text.
- Do not use excessive symbols.
- Do not use complicated Markdown.
- Use short headings.
- Avoid unnecessary ###, ##, **, or other Markdown symbols.
- Keep equations simple and readable.
- Use numbered lists where appropriate.
"""


    payload = {

        "model": "openai/gpt-oss-120b",

        "messages": [

            {
                "role": "system",
                "content": system_prompt
            },

            {
                "role": "user",
                "content": data.question
            }

        ],

        "temperature": 0.2,

        "max_tokens": 1500
    }


    try:

        response = requests.post(
            GROQ_URL,
            headers=headers,
            json=payload,
            timeout=60
        )


        if response.status_code != 200:

            return {

                "error": response.text,

                "status_code": response.status_code
            }


        result = response.json()

        answer = result["choices"][0]["message"]["content"]


        return {

            "question": data.question,

            "answer": answer
        }


    except Exception as error:

        return {

            "error": str(error)
        }
