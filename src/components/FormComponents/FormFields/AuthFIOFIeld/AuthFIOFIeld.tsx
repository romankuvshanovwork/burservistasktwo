import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

export function AuthFIOField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="fio"
      control={control}
      defaultValue=""
      rules={{
        required: "ФИО обязательно",
      }}
      render={({ field }) => (
        <FormControl>
          <FormLabel htmlFor="phone">ФИО</FormLabel>
          <TextField
            {...field}
            error={!!errors?.fio}
            helperText={errors.fio ? (errors.fio.message as string) : ""}
            autoComplete="name"
            fullWidth
            id="fio"
            placeholder="Фамилия Имя Отчество"
            color={!!errors?.fio ? "error" : "primary"}
            sx={{ ariaLabel: "phone" }}
          />
        </FormControl>
      )}
    />
  );
}
