import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GameOver from "./GameOver";

const Game = () => {
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(location.state);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const [answersArray, setAnswersArray] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      setQuizEnd(true);
    } else if (currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setAnswersArray(
        shuffleQuestionsAnswers(
          questions[currentQuestionIndex].incorrect_answers,
          questions[currentQuestionIndex].correct_answer
        )
      );
    } else {
      return;
    }
  }, [currentQuestionIndex]);

  const handleNextQuestion = (e) => {
    if (currentQuestionIndex <= questions.length - 1) {
      if (currentQuestion.correct_answer === e.target.innerText) {
        setScore((prev) => prev + 1);
      }
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const shuffleQuestionsAnswers = (array, correctAnswer) => {
    const tempArray = array.concat(correctAnswer);

    for (var i = tempArray.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));

      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }

    return tempArray;
  };

  if (quizEnd) {
    return <GameOver score={score} size={questions.length} />;
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center pt-12 text-gray-900 md:pt-24 lg:space-y-9 lg:py-36">
      <div className="relative flex w-11/12 flex-col space-y-4 rounded-lg bg-white p-4 py-8 drop-shadow-xl filter md:w-10/12 md:p-6 lg:w-[650px] lg:p-10">
        <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-blue-500">{currentQuestion.category}</p>
          <p className="text-lg font-bold">
            Score: <span className=" text-emerald-500">{score}pts</span> /{" "}
            {questions.length}
          </p>
        </div>

        <p
          className="font-medium lg:text-lg"
          dangerouslySetInnerHTML={{
            __html: "Q: " + DOMPurify.sanitize(currentQuestion.question),
          }}
        ></p>

        {answersArray?.map((answer, idx) => (
          <div
            className="!mt-8 w-full cursor-pointer rounded-lg border border-gray-700 p-3 shadow-md duration-300 hover:border-blue-500 hover:text-blue-500"
            onClick={handleNextQuestion}
            key={idx}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(answer),
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Game;
