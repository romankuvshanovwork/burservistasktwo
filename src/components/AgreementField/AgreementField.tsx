import { Control, FieldErrors, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Switch from "@mui/material/Switch/Switch";

export function AgreementField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="agreement"
      control={control}
      rules={{ required: "Согласие обязательно" }}
      render={({ field }) => (
        <FormControl
          sx={{ marginX: "auto", marginY: "8px" }}
          fullWidth
          error={!!errors.agreement}
        >
          <FormControlLabel
            sx={{ marginX: "auto" }}
            control={<Switch {...field} />}
            label="Я согласен с обработкой моих персональных данных"
          />
          {errors.agreement && (
            <FormHelperText error>
              {typeof errors.agreement.message === "string"
                ? errors.agreement.message
                : "Invalid selection"}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
