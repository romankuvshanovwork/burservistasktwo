import { useForm } from "react-hook-form";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";
import { FormSuccessMessage } from "../FormComponents/FormSuccessMessage/FormSuccessMessage";
import { BoysQuestionnaire } from "./BoysQuestionnaire/BoysQuestionnaire";
import { GirlsQuestionnaire } from "./GirlsQuestionnaire/GirlsQuestionnaire";
import { useState } from "react";

export default function Questionnaire() {
  const [formSent, setFormSent] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const questionnaire = QuestionnaireAPI;
  const user = User;
  const userGender = user.currentUser().gender;

  const onSubmit = (data: any) => {
    if (user.isLogedIn() && user.currentUser()) {
      questionnaire.addNewQuestionnaire(user.currentUser(), {
        ...data,
      });
      setFormSent(true);
    }
  };

  if (formSent) return <FormSuccessMessage />;

  if (userGender === "male")
    return (
      <BoysQuestionnaire
        control={control}
        errors={errors}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
      />
    );

  if (userGender === "female")
    return (
      <GirlsQuestionnaire
        control={control}
        errors={errors}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
      />
    );

  return <></>;
}
