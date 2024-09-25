import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { QUIZ_DATA } from "../../../constants/quizData";
import { red, green } from "@mui/material/colors";
import styled from "@mui/material/styles/styled";

enum Correctness {
  Correct = "Правильно",
  SemiCorrect = "Частично правильно",
  NotCorrect = "Неправильно",
}

const SquareStepIcon = styled("div")<{ correct: boolean }>(({ correct }) => ({
  width: 30,
  height: 30,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: correct ? green[600] : red[600],
  color: "white",
  fontSize: "16px",
}));

function transformAnswersToResults(data: any) {
  const results: { correct: Correctness; points: number, maxPoints: number }[] = [];
  Object.entries(data).forEach(([key, answer], index) => {
    const questionType = QUIZ_DATA.questions[index].type;

    if (
      questionType === "radio" &&
      answer === QUIZ_DATA.questions[index].rightAnswer
    ) {
      results[index] = {
        correct: Correctness.Correct,
        points: QUIZ_DATA.questions[index].points,
        maxPoints: QUIZ_DATA.questions[index].points,
      };
    } else if (questionType === "checkbox" && Array.isArray(answer)) {
        let points = answer
          .filter((answerOption: any) => answerOption.state === true)
          .map((answerOption: any) => answerOption.value)
          .reduce((accumulator, answerOption) => {
            if (QUIZ_DATA.questions[index].rightAnswer.includes(answerOption))
              return accumulator + 1;
            else return accumulator;
          }, 0);
          results[index] = {
            correct: points === 0 ? Correctness.NotCorrect : points === QUIZ_DATA.questions[index].points ? Correctness.Correct : Correctness.SemiCorrect,
            points: points,
            maxPoints: QUIZ_DATA.questions[index].points,
          };
      } else {
      results[index] = { correct: Correctness.NotCorrect, points: 0, maxPoints: QUIZ_DATA.questions[index].points, };
    }
  });

  return results;
}

export default function QuizResultsStepper({
  userAnswers,
}: {
  userAnswers: any;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        marginBottom: "25px",
        marginTop: "25px",
      }}
    >
      <Stepper activeStep={-1} alternativeLabel>
        {transformAnswersToResults(userAnswers).map((result, index) => {
          return (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => (
                  <SquareStepIcon correct={result.correct === Correctness.Correct}>
                    {index + 1}
                  </SquareStepIcon>
                )}
              >
                Вопрос {index + 1}: <br></br>
                {result.correct} <br></br>
                Баллов: {result.points}/{result.maxPoints}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
