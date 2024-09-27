import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import Typography from "@mui/material/Typography/Typography";
import { FirstNameField } from "../../FormComponents/FormFields/FirstNameField/FirstNameField";
import { LastNameField } from "../../FormComponents/FormFields/LastNameField/LastNameField";
import { FavoriteActorField } from "../../FormComponents/FormFields/FavotiteActorField/FavotiteActorField";
import { FavoriteColorField } from "../../FormComponents/FormFields/FavoriteColorField/FavoriteColorField";
import { FavoriteSportField } from "../../FormComponents/FormFields/FavoriteSportField/FavoriteSportField";
import { FreeTimeActivitiesField } from "../../FormComponents/FormFields/FreeTimeActivitiesField/FreeTimeActivitiesField";
import { SignField } from "../../FormComponents/FormFields/SignField/SignField";
import { AgreementField } from "../../FormComponents/FormFields/AgreementField/AgreementField";
import { FormSubmitButton } from "../../FormComponents/FormSubmitButton/FormSubmitButton";
import { FormEventHandler } from "react";
import Box from "@mui/material/Box/Box";
import { FavoriteActressField } from "../../FormComponents/FormFields/FavoriteActressField/FavoriteActressField";
import { FavoriteSchoolSubjectField } from "../../FormComponents/FormFields/FavoriteSchoolSubjectField/FavoriteSchoolSubjectField";
import { LearningOptionsField } from "../../FormComponents/FormFields/LearningOptionsField/LearningOptionsField";
import {
  QUESTIONNAIRE_AGREEMENT_SIGN,
  QUESTIONNAIRE_TITLE,
} from "../../../constants/genderDependantQuestionnaireSigns";

export function GenderDependantQuestionnaire({
  control,
  errors,
  setValue,
  onSubmit,
  gender,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  onSubmit: FormEventHandler;
  gender: "male" | "female";
}) {
  const genderSpecificFields = () => {
    if (gender === "male") {
      return (
        <>
          <FavoriteActorField control={control} errors={errors} />
          <FavoriteColorField control={control} errors={errors} />
          <FavoriteSportField
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <FreeTimeActivitiesField control={control} setValue={setValue} />
        </>
      );
    } else if (gender === "female") {
      return (
        <>
          <FavoriteActressField control={control} errors={errors} />
          <FavoriteColorField control={control} errors={errors} />
          <FavoriteSchoolSubjectField
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <LearningOptionsField control={control} setValue={setValue} />
        </>
      );
    }
  }

  return (
    <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
      <Typography variant="h4">{QUESTIONNAIRE_TITLE[gender]}</Typography>
      <form onSubmit={onSubmit}>
        <FirstNameField control={control} errors={errors} />
        <LastNameField control={control} errors={errors} />
        {genderSpecificFields()}
        <SignField control={control} errors={errors} setValue={setValue} />
        <AgreementField
          control={control}
          errors={errors}
          label={QUESTIONNAIRE_AGREEMENT_SIGN[gender]}
        />
        <FormSubmitButton label="Отправить анкету" />
      </form>
    </Box>
  );
}
