import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import Typography from "@mui/material/Typography/Typography";
import { FirstNameField } from "../../FormComponents/FormFields/FirstNameField/FirstNameField";
import { LastNameField } from "../../FormComponents/FormFields/LastNameField/LastNameField";
import { FavoriteColorField } from "../../FormComponents/FormFields/FavoriteColorField/FavoriteColorField";
import { SignField } from "../../FormComponents/FormFields/SignField/SignField";
import { AgreementField } from "../../FormComponents/FormFields/AgreementField/AgreementField";
import { FormSubmitButton } from "../../FormComponents/FormSubmitButton/FormSubmitButton";
import { FormEventHandler } from "react";
import { FavoriteActressField } from "../../FormComponents/FormFields/FavoriteActressField/FavoriteActressField";
import { FavoriteSchoolSubjectField } from "../../FormComponents/FormFields/FavoriteSchoolSubjectField/FavoriteSchoolSubjectField";
import { LearningOptionsField } from "../../FormComponents/FormFields/LearningOptionsField/LearningOptionsField";
import Box from "@mui/material/Box/Box";

export function GirlsQuestionnaire({
  control,
  errors,
  setValue,
  onSubmit,
  trigger
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  onSubmit: FormEventHandler;
  trigger: UseFormTrigger<FieldValues>;
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
          trigger={trigger}
        />
        <LearningOptionsField control={control} setValue={setValue} />
        <SignField control={control} errors={errors} setValue={setValue} trigger={trigger} />
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
