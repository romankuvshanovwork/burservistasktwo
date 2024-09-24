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

// ВОПРОС: Оставить тут или вынести? Если выносить, то в utils, например?
function countPoints(data: any) {
  let points = 0;
  Object.entries(data).forEach(([key, answer], index) => {
    const questionType = QUIZ_DATA[index].type;

    if (questionType === "radio" && answer === QUIZ_DATA[index].rightAnswer) {
      points += QUIZ_DATA[index].points;
    }
    if (
      questionType === "checkbox" &&
      Array.isArray(answer) &&
      answer
        .filter((answerOption: any) => answerOption.state === true)
        .map((answerOption: any) => answerOption.value)
        .every((answerOption: any) =>
          QUIZ_DATA[index].rightAnswer.includes(answerOption)
        )
    ) {
      points += QUIZ_DATA[index].points;
    }
  });

  return points;
}

const maxAmountOfPoints = QUIZ_DATA.reduce(
  (accumulator, currentValue) => accumulator + currentValue.points,
  0
);

export default function Quiz() {
  const [formSent, setFormSent] = useState(false);
  const [amountOfPoints, setAmpontOfPoints] = useState<number>(0);
  const [results, setResults] = useState();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const points = countPoints(data);
    setAmpontOfPoints(points);
    setFormSent(true);
    setResults(data);
    console.log(data);
  };

  if (formSent) {
    return (
      <QuizLayout>
        <QuizResultsStepper results={results} />
        <QuizFormSuccessMessage
          amountOfPoints={amountOfPoints}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {QUIZ_DATA.map((quiz_element) =>
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
