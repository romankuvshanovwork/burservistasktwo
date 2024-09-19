import {
  Control,
  UseFormSetValue,
  FieldValues,
  FieldErrors,
} from "react-hook-form";
import { FileUploadField } from "../../CustomReusableFormFields/FileUploadField/FileUploadField";

export function SignField({
  control,
  errors,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return (
    <FileUploadField
      control={control}
      errors={errors}
      validateErrorMessage="Загрузка подписи обязательна"
      label="Загрузите вашу подпись*"
      accept="image/*"
      name="sign"
      setValue={setValue}
    />
  );
}
