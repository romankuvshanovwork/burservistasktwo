import { Control, FieldErrors } from "react-hook-form";
import { SelectField } from "../../CustomReusableFormFields/SelectField/SelectField";
import { ACTRESSES } from "../../../../constants/actresses";

export function FavoriteActressField({
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
      options={ACTRESSES}
      label={"Любимая актриса*"}
      helperText={"Пожалуйста, выберите вашу любимую актрису"}
      errorRequiredText={"Выбор любимой актрисы обязателен"}
      name="favoriteActor"
      selectId="outlined-select-favorite-actor"
    />
  );
}
