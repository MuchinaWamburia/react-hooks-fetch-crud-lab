import React,{useState,useEffect} from "react";
import QuestionItem from"./QuestionItem";

function QuestionList() {
  // const [selectedQuestions, setSelectedQuestions] = useState("All");
  const [quiz, setQuiz] = useState([]);

    // Add useEffect hook
    useEffect(() => {
      fetch("http://localhost:4000/questions")
        .then((r) => r.json())
        .then((quiz) => setQuiz(quiz));
    }, []);
  
    // ...rest of component
    function handleDelete(id) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then(() => {
          const updatedQuiz = quiz.filter((q) => q.id !== id);
          setQuiz(updatedQuiz);
        });
    }

    function handleAnswer(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      })
        .then((r) => r.json())
        .then((updatedQuiz) => {
          const updatedQuestion = quiz.map((q) => {
            if (q.id === updatedQuiz) 
            return updatedQuiz;
            return q;
          });
          setQuiz(updatedQuiz);
        });
    }

    const questionItems = quiz.map((q) => (
      <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDelete}
      onAnswerChange={handleAnswer}
      />
    ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
