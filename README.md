# Chatvocate – IPC Expert

Chatvocate is an AI-powered legal question-answering application built using **Retrieval-Augmented Generation (RAG)**. It allows users to ask legal questions and receive context-aware answers based on uploaded legal documents.

The application uses **ChromaDB** for vector storage, **Sentence Transformers** for generating document embeddings, and the **OpenAI API** for generating natural-language responses.

## Features

- **Document-Based Question Answering:** Answers legal queries using uploaded legal documents.
- **Retrieval-Augmented Generation (RAG):** Retrieves relevant document sections before generating responses.
- **Vector Database:** Uses ChromaDB to store and retrieve document embeddings.
- **Semantic Search:** Uses Sentence Transformers to generate embeddings and identify relevant legal content.
- **AI-Powered Responses:** Uses the OpenAI API to generate context-aware answers.
- **Conversational Interaction:** Allows users to interact with the application through natural-language queries.

## Technologies Used

**Backend:** Python, Django, Django REST Framework  
**Frontend:** React.js, JavaScript  
**AI/ML:** Retrieval-Augmented Generation (RAG), OpenAI API, Sentence Transformers  
**Vector Database:** ChromaDB  
**Document Processing:** PyPDF  
**Tools:** Git, GitHub, Postman

## How It Works

1. Legal documents are uploaded to the application.
2. The documents are processed and divided into smaller chunks.
3. Sentence Transformers generate embeddings for the document chunks.
4. The embeddings are stored in ChromaDB.
5. When a user asks a legal question, the application retrieves relevant document chunks using semantic search.
6. The retrieved content is passed as context to the OpenAI API.
7. The AI generates a response based on the retrieved legal information.

## Project Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd chatvocate-ipc-expert
```

### 2. Backend Setup

Create and activate a virtual environment:

```bash
python -m venv venv
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_MODEL=your_model_name
```

Do not upload your actual API key to GitHub.

### 4. Run the Backend

Navigate to the Django backend directory and run:

```bash
python manage.py migrate
python manage.py runserver
```

### 5. Run the Frontend

Navigate to the React frontend directory:

```bash
npm install
npm run dev
```

## Important Note

The application generates answers based on the legal documents available in its knowledge base. Its responses should be treated as informational assistance, not as a substitute for professional legal advice. Legal information should be verified against authoritative and up-to-date sources.