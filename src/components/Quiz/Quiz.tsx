import { useState } from "react";
import { useForm } from "react-hook-form";
import { QUIZ_DATA } from "../../constants/quizData";
import { FormSubmitButton } from "../FormComponents/FormSubmitButton/FormSubmitButton";
import { QuizFormSuccessMessage } from "../FormComponents/QuizFormSuccessMessage/QuizFormSuccessMessage";
import { QuizRadioFormField } from "../FormComponents/FormFields/QuizRadioFormField/QuizRadioFormField";
import { QuizLayout } from "./QuizLayout/QuizLayout";
import { QuizCheckboxesGroupFormField } from "../FormComponents/FormFields/QuizCheckboxesGroupFormField/QuizCheckboxesGroupFormField";
import QuizResultsStepper from "./QuizResultsStepper/QuizResultsStepper";
import Box from "@mui/material/Box/Box";
import { QuizLearnParagraphSection } from "./QuizLearnParagraphSection/QuizLearnParagraphSection";
import Button from "@mui/material/Button/Button";
import { User } from "../../api/User";
import { useQuizStore } from "../../api/QuizAPI";

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

const maxAmountOfPoints = QUIZ_DATA.questions.reduce(
  (accumulator, currentValue) => accumulator + currentValue.points,
  0
);

export default function Quiz() {
  const [formSent, setFormSent] = useState(false);
  const [userAnswers, setUserAnswers] = useState();

  const { addNewQuiz } = useQuizStore();
  const user = User;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setFormSent(true);
    setUserAnswers(data);
    addNewQuiz(user.currentUser(), data);
  };

  function resetFormAndState() {
    setFormSent(false);
    setUserAnswers(undefined);
    reset();
  }

  if (formSent) {
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
  } else {
    return (
      <QuizLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: "500px",
            marginTop: "0px",
            marginX: "auto",
          }}
        >
          <QuizLearnParagraphSection paragraph={QUIZ_DATA.paragraph} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {QUIZ_DATA.questions.map((quiz_element) =>
              quiz_element.type === "radio" ? (
                <QuizRadioFormField
                  control={control}
                  errors={errors}
                  quiz_element={quiz_element}
                />
              ) : (
                <QuizCheckboxesGroupFormField
                  control={control}
                  errors={errors}
                  quiz_element={quiz_element}
                  setValue={setValue}
                />
              )
            )}
            <FormSubmitButton label="Проверить" />
          </form>
        </Box>
      </QuizLayout>
    );
  }
}
