import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import Typography from "@mui/material/Typography/Typography";
import { FirstNameField } from "../FormFields/FirstNameField/FirstNameField";
import { LastNameField } from "../FormFields/LastNameField/LastNameField";
import { FavoriteColorField } from "../FormFields/FavoriteColorField/FavoriteColorField";
import { SignField } from "../FormFields/SignField/SignField";
import { AgreementField } from "../FormFields/AgreementField/AgreementField";
import { FormSubmitButton } from "../FormSubmitButton/FormSubmitButton";
import { FormEventHandler } from "react";
import { FavoriteActressField } from "../FormFields/FavoriteActressField/FavoriteActressField";
import { FavoriteSchoolSubjectField } from "../FormFields/FavoriteSchoolSubjectField/FavoriteSchoolSubjectField";
import { LearningOptionsField } from "../FormFields/LearningOptionsField/LearningOptionsField";
import Box from "@mui/material/Box/Box";

export function GirlsQuestionnaire({
  control,
  errors,
  setValue,
  onSubmit,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  onSubmit: FormEventHandler;
}) {
  return (
    <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
      <Typography variant="h4">Анкета для девочек</Typography>
      <form onSubmit={onSubmit}>
        <FirstNameField control={control} errors={errors} />
        <LastNameField control={control} errors={errors} />
        <FavoriteActressField control={control} errors={errors} />
        <FavoriteColorField control={control} errors={errors} />
        <FavoriteSchoolSubjectField
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <LearningOptionsField control={control} setValue={setValue} />
        <SignField control={control} errors={errors} setValue={setValue} />
        <AgreementField
          control={control}
          errors={errors}
          label="Я согласна с обработкой моих персональных данных"
        />
        <FormSubmitButton label="Отправить анкету" />
      </form>
    </Box>
  );
}
