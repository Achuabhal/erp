import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner, Alert } from "react-bootstrap";
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
    <div className="mb-4">
      <Button onClick={handleGenerate} disabled={generating}>
        {generating ? <Spinner animation="border" size="sm" /> : "Generate Questions"}
      </Button>
      {message && (
        <Alert className="mt-3" variant={error ? "danger" : "info"}>
          {message}
        </Alert>
      )}
      {questions && <QuestionList questions={questions} />}
    </div>
  );
};

export default GenerateForm;
