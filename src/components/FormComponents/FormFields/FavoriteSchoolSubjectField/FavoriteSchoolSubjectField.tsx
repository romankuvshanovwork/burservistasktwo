import {
  Control,
  FieldErrors,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import { CheckboxesGroupField } from "../../CustomReusableFormFields/CheckboxesGroupField/CheckboxesGroupField";
import { SCHOOL_SUBJECTS } from "../../../../constants/schoolSubjects";

export function FavoriteSchoolSubjectField({
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
      options={SCHOOL_SUBJECTS}
      label={"Любимый/любимые школьные предметы*"}
      validateErrorMessage={"Выберите хотя бы один предмет"}
      name={"favoriteSchoolSubject"}
      setValue={setValue}
    />
  );
}
