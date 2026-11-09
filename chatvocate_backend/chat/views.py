import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .rag import (
    initialize_rag,
    retrieve_relevant_chunks,
    build_context,
    generate_answer
)


logger = logging.getLogger(__name__)


# ==========================================================
# INITIALIZE THE RAG KNOWLEDGE BASE
# ==========================================================

collection = None

try:
    collection = initialize_rag()

except Exception:
    logger.exception(
        "Failed to initialize the IPC knowledge base."
    )


# ==========================================================
# CHAT API
# ==========================================================

@api_view(['POST'])
def chat_api(request):

    # Get the question sent by React
    user_question = request.data.get(
        "question", ""
    ).strip()

    # Validate the question
    if not user_question:
        return Response(
            {"error": "Please enter a question."},
            status=400
        )

    # Check whether the knowledge base is available
    if collection is None:
        return Response(
            {
                "error": (
                    "IPC knowledge base is unavailable. "
                    "Check the Django terminal for errors."
                )
            },
            status=503
        )

    try:

        # STEP 1: Retrieve relevant IPC sections
        relevant_chunks = retrieve_relevant_chunks(
            user_question,
            collection,
            top_k=2
        )

        # STEP 2: Build context
        context = build_context(
            relevant_chunks
        )

        # STEP 3: Generate the answer
        answer = generate_answer(
            user_question,
            context,
            chat_history=[]
        )

        # STEP 4: Return the answer to React
        return Response({
            "question": user_question,
            "answer": answer
        })

    except Exception:

        logger.exception(
            "Error while processing the chat request."
        )

        return Response(
            {
                "error": (
                    "Unable to generate an answer. "
                    "Please check the Django terminal."
                )
            },
            status=500
        )