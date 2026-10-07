# CSPML Lab 5 – AI Teaching Assistant

## Project Title

**AI Teaching Assistant for Digital Communication Systems**

## Objective

The aim of this project is to develop a simple AI teaching assistant for the subject **Digital Communication Systems**.

Students can ask questions through a webpage, and the AI gives an easy explanation, an example, a short quiz, and flashcards for revision.

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python and FastAPI
* **LLM:** Hugging Face API
* **Context:** Markdown (`context.md`)
* **API Key:** `.env` file
* **Version Control:** Git and GitHub

## How the System Works

The student enters a question on the webpage.

The question is sent to the **FastAPI backend**. The backend reads the Digital Communication Systems information from `context.md` and sends the question along with the teaching instructions to the Hugging Face LLM.

The generated answer is then sent back to the webpage and shown to the student.

### Basic Flow

**Student → Frontend → Backend → Context + LLM → Backend → Frontend → Student**

## Teaching Features

The AI is instructed to:

* Explain the **basic idea** first.
* Use simple and student-friendly language.
* Give examples when needed.
* Explain formulas and symbols clearly.
* Show numerical problems step by step.
* Give **2–3 quiz questions**.
* Generate easy-to-remember **flashcards**.

## Context File

A `context.md` file is used to give the AI subject-specific knowledge and teaching instructions.

It contains topics such as:

* Sampling
* PCM
* ASK, FSK and PSK
* BPSK and QPSK
* AWGN
* BER
* Signal space
* Inter-symbol interference

This helps the AI stay focused on Digital Communication Systems.

## Security

The Hugging Face API key is stored in the `.env` file instead of being written directly in the Python code.

The `.env` file is also added to `.gitignore` so that the API key is not uploaded to GitHub.

## Future Improvements

In the future, the project can be improved by adding:

* Voice input
* Chat history
* Automatic quiz scoring
* Student progress tracking
* More subject material
* Deployment as an online website

## Conclusion

This project helped me understand how a **frontend, backend, context file and LLM API** can work together to create an AI-based teaching assistant. It also helped me learn the basics of using APIs, FastAPI, web development, and GitHub.
