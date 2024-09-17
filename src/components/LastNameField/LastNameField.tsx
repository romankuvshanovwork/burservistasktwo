import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors, Controller } from "react-hook-form";

export function LastNameField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="lastName"
      control={control}
      defaultValue=""
      rules={{ required: "Фамилия обязательна" }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Ваша фамилия*"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={
            errors.lastName ? (errors.lastName.message as string) : ""
          }
        />
      )}
    />
  );
}
