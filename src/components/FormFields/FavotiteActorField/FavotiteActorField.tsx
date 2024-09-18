import { Control, FieldErrors } from "react-hook-form";
import { SelectField } from "../../CustomReusableFormFields/SelectField/SelectField";
import { ACTORS } from "../../../constants/actors";

export function FavoriteActorField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <SelectField
      control={control}
      errors={errors}
      options={ACTORS}
      label={"Любимый актер*"}
      helperText={"Пожалуйста, выберите вашего любимого актера"}
      errorRequiredText={"Выбор любимого актера обязателен"}
      name="favoriteActor"
      selectId="outlined-select-favorite-actor"
    />
  );
}
