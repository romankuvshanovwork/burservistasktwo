import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

export function AuthPhoneField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="phone"
      control={control}
      defaultValue=""
      rules={{
        required: "Номер телефона обязателен",
        pattern: {
          value: /^((\+7)+([0-9]){10})$/,
          message:
            "Пожалуйста, введите корректный номер телефона. Пример: +79990001234",
        },
      }}
      render={({ field }) => (
        <FormControl>
          <FormLabel htmlFor="phone">Телефон</FormLabel>
          <TextField
            {...field}
            error={!!errors?.phone}
            helperText={errors.phone ? (errors.phone.message as string) : ""}
            id="phone"
            type="tel"
            placeholder="+79990001234"
            autoComplete="phone"
            autoFocus
            fullWidth
            variant="outlined"
            color={!!errors?.phone ? "error" : "primary"}
            sx={{ ariaLabel: "phone" }}
          />
        </FormControl>
      )}
    />
  );
}
