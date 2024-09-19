import {
  Control,
  FieldErrors,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import { CheckboxesGroupField } from "../../CustomReusableFormFields/CheckboxesGroupField/CheckboxesGroupField";
import { TYPES_OF_SPORT } from "../../../../constants/typesOfSport";

export function FavoriteSportField({
  control,
  errors,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return (
    <CheckboxesGroupField
      control={control}
      errors={errors}
      options={TYPES_OF_SPORT}
      label={"Любимый/любимые виды спорта*"}
      validateErrorMessage={"Выберите хотя бы один вид спорта"}
      name={"favoriteSport"}
      setValue={setValue}
    />
  );
}
