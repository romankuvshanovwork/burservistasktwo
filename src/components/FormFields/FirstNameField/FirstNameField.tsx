import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors, Controller } from "react-hook-form";

export function FirstNameField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="firstName"
      control={control}
      defaultValue=""
      rules={{ required: "Имя обязательно" }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Ваше имя*"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={
            errors.firstName ? (errors.firstName.message as string) : ""
          }
        />
      )}
    />
  );
}
