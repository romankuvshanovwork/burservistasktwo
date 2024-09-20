import {
  Control,
  UseFormSetValue,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { FileUploadField } from "../../CustomReusableFormFields/FileUploadField/FileUploadField";

export function SignField({
  control,
  errors,
  setValue,
  trigger,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
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
      trigger={trigger}
    />
  );
}
