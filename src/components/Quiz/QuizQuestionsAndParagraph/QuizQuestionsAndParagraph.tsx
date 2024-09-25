import { QUIZ_DATA } from "../../../constants/quizData";
import { QuizLayout } from "../QuizLayout/QuizLayout";
import Box from "@mui/material/Box/Box";
import { QuizLearnParagraphSection } from "../QuizLearnParagraphSection/QuizLearnParagraphSection";
import { QuizRadioFormField } from "../../FormComponents/FormFields/QuizRadioFormField/QuizRadioFormField";
import { QuizCheckboxesGroupFormField } from "../../FormComponents/FormFields/QuizCheckboxesGroupFormField/QuizCheckboxesGroupFormField";
import { FormSubmitButton } from "../../FormComponents/FormSubmitButton/FormSubmitButton";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

export function QuizQuestionsAndParagraph({
  control,
  errors,
  setValue,
  handleSubmit,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  handleSubmit: () => void;
}) {
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
        <form onSubmit={handleSubmit}>
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
