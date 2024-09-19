import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import Typography from "@mui/material/Typography/Typography";
import { FirstNameField } from "../FormComponents/FormFields/FirstNameField/FirstNameField";
import { LastNameField } from "../FormComponents/FormFields/LastNameField/LastNameField";
import { FavoriteActorField } from "../FormComponents/FormFields/FavotiteActorField/FavotiteActorField";
import { FavoriteColorField } from "../FormComponents/FormFields/FavoriteColorField/FavoriteColorField";
import { FavoriteSportField } from "../FormComponents/FormFields/FavoriteSportField/FavoriteSportField";
import { FreeTimeActivitiesField } from "../FormComponents/FormFields/FreeTimeActivitiesField/FreeTimeActivitiesField";
import { SignField } from "../FormComponents/FormFields/SignField/SignField";
import { AgreementField } from "../FormComponents/FormFields/AgreementField/AgreementField";
import { FormSubmitButton } from "../FormComponents/FormSubmitButton/FormSubmitButton";
import { FormEventHandler } from "react";
import Box from "@mui/material/Box/Box";

export function BoysQuestionnaire({
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
      <Typography variant="h4">Анкета для мальчиков</Typography>
      <form onSubmit={onSubmit}>
        <FirstNameField control={control} errors={errors} />
        <LastNameField control={control} errors={errors} />
        <FavoriteActorField control={control} errors={errors} />
        <FavoriteColorField control={control} errors={errors} />
        <FavoriteSportField
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <FreeTimeActivitiesField control={control} setValue={setValue} />
        <SignField control={control} errors={errors} setValue={setValue} />
        <AgreementField
          control={control}
          errors={errors}
          label="Я согласен с обработкой моих персональных данных"
        />
        <FormSubmitButton label="Отправить анкету" />
      </form>
    </Box>
  );
}
