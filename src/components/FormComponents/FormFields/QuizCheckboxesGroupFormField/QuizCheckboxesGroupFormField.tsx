import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  MULTIPLE_RIGHT_ANSWERS,
  ONE_RIGHT_ANSWER,
} from "../../../../constants/quizQuestionsEndings";
import { CheckboxesGroupField } from "../../CustomReusableFormFields/CheckboxesGroupField/CheckboxesGroupField";

export function QuizCheckboxesGroupFormField({
  control,
  errors,
  quiz_element,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  quiz_element: any;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return (
    <CheckboxesGroupField
      control={control}
      errors={errors}
      options={quiz_element.options.map((option: any) => ({
        value: option,
        label: option,
      }))}
      label={`${quiz_element.question}* (${
        Array.isArray(quiz_element.rightAnswer) &&
        quiz_element.rightAnswer.length > 1
          ? MULTIPLE_RIGHT_ANSWERS
          : ONE_RIGHT_ANSWER
      })`}
      validateErrorMessage={"Ответ на этот вопрос обязателен"}
      name={quiz_element.id.toFixed()}
      setValue={setValue}
      key={quiz_element.id}
    />
  );
}
