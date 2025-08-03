import React, { useState } from "react";
import axios from "axios";
import QuestionList from "../components/QuestionList";

const GenerateForm = () => {
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState("");

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage("");
    setError(false);

    try {
      const res = await axios.get("http://localhost:5000/generate-questions");
      console.log("✅ Response from backend:", res.data);

      if (res.data && res.data.questions) {
        setQuestions(res.data.questions);
        setMessage("✅ Questions generated successfully!");
      } else {
        setError(true);
        setMessage("⚠️ No questions returned from backend.");
      }
    } catch (err) {
      console.error("❌ Error in Axios request:", err);
      setError(true);
      setMessage("❌ Error generating questions.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Question Generator</h2>

        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`px-6 py-2 rounded-lg text-white transition-all duration-300 ${
              generating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {generating ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
            ) : (
              "Generate Questions"
            )}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 text-center px-4 py-3 rounded-lg text-sm font-medium ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {questions && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Generated Questions:</h3>
            <QuestionList questions={questions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateForm;
