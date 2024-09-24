import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { QUIZ_DATA } from "../../../constants/quizData";
import { red, green } from "@mui/material/colors";

function countPoints(data: any) {
  let points = 0;
  const results: { correct: boolean; points: number }[] = [];
  Object.entries(data).forEach(([key, answer], index) => {
    const questionType = QUIZ_DATA[index].type;

    if (
      (questionType === "radio" && answer === QUIZ_DATA[index].rightAnswer) ||
      (questionType === "checkbox" &&
        Array.isArray(answer) &&
        answer
          .filter((answerOption: any) => answerOption.state === true)
          .map((answerOption: any) => answerOption.value)
          .every((answerOption: any) =>
            QUIZ_DATA[index].rightAnswer.includes(answerOption)
          ))
    ) {
      points += QUIZ_DATA[index].points;
      results[index] = { correct: true, points: QUIZ_DATA[index].points };
    } else {
      results[index] = { correct: false, points: 0 };
    }
  });

  return results;
}

export default function QuizResultsStepper({ results }: { results: any }) {
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
        {countPoints(results).map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: label.correct ? green[600] : red[600], // Apply green or red color based on correctness
                  },
                }}
              >
                Вопрос {index + 1}:{" "}
                {label.correct ? "Правильно" : "Неправильно"}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
