import { useForm } from "react-hook-form";
import { useUserStore } from "../../api/UserAPI";
import { useQuestionnaireStore } from "../../api/QuestionnaireAPI";
import { FormSuccessMessage } from "../FormComponents/FormSuccessMessage/FormSuccessMessage";
import { useState } from "react";
import { GenderDependantQuestionnaire } from "./GenderDependantQuestionnaire/GenderDependantQuestionnaire";

export default function Questionnaire() {
  const [formSent, setFormSent] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { addNewQuestionnaire } = useQuestionnaireStore();
  const { isLogedIn, currentUser } = useUserStore();

  const userGender = currentUser?.gender;

  const onSubmit = (data: any) => {
    if (isLogedIn() && currentUser) {
      addNewQuestionnaire(currentUser, {
        ...data,
      });
      setFormSent(true);
    }
  };

  if (formSent) return <FormSuccessMessage />;
  else if (userGender) {
    return (
      <GenderDependantQuestionnaire
        control={control}
        errors={errors}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        gender={userGender}
      />
    );
  }

  return null;
}
