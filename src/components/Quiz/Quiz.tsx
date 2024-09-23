import Box from "@mui/material/Box";
import { QuizHeadline } from "./QuizHeadline/QuizHeadline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { QUIZ_DATA } from "../../constants/quizData";
import { CheckboxesGroupField } from "../FormComponents/CustomReusableFormFields/CheckboxesGroupField/CheckboxesGroupField";
import { FormSubmitButton } from "../FormComponents/FormSubmitButton/FormSubmitButton";
import { QuizFormSuccessMessage } from "../FormComponents/QuizFormSuccessMessage/QuizFormSuccessMessage";
import { QuizRadioFormField } from "../FormComponents/FormFields/QuizRadioFormField/QuizRadioFormField";

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
        .filter((item: any) => item.state === true)
        .map((item: any) => item.value)
        .every((item: any) => QUIZ_DATA[index].rightAnswer.includes(item))
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
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        maxWidth: "500px",
        marginTop: "50px",
        marginX: "auto",
      }}
    >
      <QuizHeadline headline="Викторина" />
      {formSent ? (
        <QuizFormSuccessMessage
          amountOfPoints={amountOfPoints}
          maxAmountOfPoints={maxAmountOfPoints}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {QUIZ_DATA.map((quiz_element) =>
            quiz_element.type === "radio" ? (
              <QuizRadioFormField
                control={control}
                errors={errors}
                quiz_element={quiz_element}
              />
            ) : (
              <CheckboxesGroupField
                control={control}
                errors={errors}
                options={quiz_element.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
                label={quiz_element.question}
                validateErrorMessage={"Ответ на этот вопрос обязателен"}
                name={quiz_element.id.toFixed()}
                setValue={setValue}
                key={quiz_element.id}
              />
            )
          )}
          <FormSubmitButton label="Проверить" />
        </form>
      )}
    </Box>
  );
}
