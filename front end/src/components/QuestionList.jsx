import React from "react";
import { ListGroup, Card } from "react-bootstrap";

const QuestionList = ({ questions }) => {
  if (!questions) return null;

  const lines = questions.split("\n").filter(q => q.trim());

  return (
    <Card>
      <Card.Header>📘 Important Questions</Card.Header>
      <ListGroup variant="flush">
        {lines.map((q, idx) => (
          <ListGroup.Item key={idx}>{q}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default QuestionList;
