import { QUIZ_DATA } from "../../../constants/quizData";
import { QuizLayout } from "../QuizLayout/QuizLayout";
import QuizResultsStepper from "../QuizResultsStepper/QuizResultsStepper";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { QuizFormSuccessMessage } from "../../FormComponents/QuizFormSuccessMessage/QuizFormSuccessMessage";

const maxAmountOfPoints = QUIZ_DATA.questions.reduce(
  (accumulator, currentValue) => accumulator + currentValue.points,
  0
);

// ВОПРОС: Оставить тут или вынести? Если выносить, то в utils, например?
function countPoints(data: any) {
  let points = 0;
  Object.values(data).forEach((answer, index) => {
    const questionType = QUIZ_DATA.questions[index].type;

    if (
      questionType === "radio" &&
      answer === QUIZ_DATA.questions[index].rightAnswer
    ) {
      points += QUIZ_DATA.questions[index].points;
    }
    if (questionType === "checkbox" && Array.isArray(answer)) {
      points += answer
        .filter((answerOption: any) => answerOption.state === true)
        .map((answerOption: any) => answerOption.value)
        .reduce((accumulator, answerOption) => {
          if (QUIZ_DATA.questions[index].rightAnswer.includes(answerOption))
            return accumulator + 1;
          else return accumulator;
        }, 0);
    }
  });

  return points;
}

export function QuizResults({
  userAnswers,
  resetFormAndState,
}: {
  userAnswers: any;
  resetFormAndState: () => void;
}) {
  return (
    <QuizLayout>
      <QuizResultsStepper userAnswers={userAnswers} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Button onClick={resetFormAndState} variant="outlined">
          Вернуться к изучению
        </Button>
      </Box>
      <QuizFormSuccessMessage
        amountOfPoints={countPoints(userAnswers)}
        maxAmountOfPoints={maxAmountOfPoints}
      />
    </QuizLayout>
  );
}
