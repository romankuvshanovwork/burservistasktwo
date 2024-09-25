import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../api/User";
import { useQuizStore } from "../../api/QuizAPI";
import { QuizResults } from "./QuizResults/QuizResults";
import { QuizQuestionsAndParagraph } from "./QuizQuestionsAndParagraph/QuizQuestionsAndParagraph";

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
      <QuizResults
        userAnswers={userAnswers}
        resetFormAndState={resetFormAndState}
      />
    );
  } else {
    return (
      <QuizQuestionsAndParagraph
        control={control}
        errors={errors}
        setValue={setValue}
        handleSubmit={handleSubmit(onSubmit)}
      />
    );
  }
}
