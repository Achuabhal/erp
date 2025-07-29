from flask import Flask, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables from .env
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Upload directory
UPLOAD_FOLDER = 'uploads'

@app.route("/generate-questions", methods=["GET"])
def generate_questions():
    # Check if uploads folder exists
    if not os.path.exists(UPLOAD_FOLDER):
        return jsonify({"error": "Uploads folder not found"}), 500

    # Get PDF files from uploads
    pdf_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith(".pdf")]
    if not pdf_files:
        return jsonify({"error": "No PDF files found in uploads folder"}), 400

    # Extract text from PDFs
    combined_text = ""
    for filename in pdf_files:
        pdf_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            reader = PdfReader(pdf_path)
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    combined_text += text + "\n"
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    if not combined_text.strip():
        return jsonify({"error": "No text found in PDFs"}), 400

    # Split text into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_text(combined_text)

    # Generate embeddings and FAISS index
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    retriever = vector_store.as_retriever()
    relevant_docs = retriever.invoke("Generate important questions")

    # Prompt template
    prompt_template = PromptTemplate(
        input_variables=["context"],
        template="""
        Based on the following syllabus and previous year question papers, generate 10 important exam questions from each Part A and Part B. 
        Focus on repeated concepts, definitions, and problem-solving patterns.If the questions are repeated mention it as (repeated)

        Context:
        {context}

        Important Questions:
        """
    )

    # Gemini LLM
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)

    # Create chain with updated method
    chain = create_stuff_documents_chain(llm=llm, prompt=prompt_template)

    # Invoke chain with retrieved docs
    result = chain.invoke({"context": relevant_docs})

    # Return result
    if isinstance(result, dict) and "output_text" in result:
        return jsonify({"questions": result["output_text"].strip()}), 200
    else:
        return jsonify({"questions": str(result).strip()}), 200

if __name__ == "__main__":
    app.run(debug=True)
