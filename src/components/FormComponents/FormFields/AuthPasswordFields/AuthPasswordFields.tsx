import Box from "@mui/material/Box/Box";
import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";

export function AuthPasswordFields({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{
        required: "Пароль обязателен",
        minLength: {
          value: 6,
          message: "Пароль должен быть не короче 6 символов",
        },
      }}
      render={({ field }) => (
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <ReactRouterLink to={"/rememberpassword"}>
              Забыли пароль?
            </ReactRouterLink>
          </Box>
          <TextField
            {...field}
            error={!!errors?.password}
            helperText={
              errors.password ? (errors.password.message as string) : ""
            }
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            fullWidth
            variant="outlined"
            color={!!errors?.password ? "error" : "primary"}
          />
        </FormControl>
      )}
    />
  );
}
