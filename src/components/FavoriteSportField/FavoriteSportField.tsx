import {
  Control,
  FieldErrors,
  Controller,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { useState } from "react";

export function FavoriteSportField({
  control,
  errors,
  setValue,
  options,
  label,
  validateErrorMessage,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
  options: any;
  label: string;
  validateErrorMessage: string;
}) {
  const [sportsState, setSportsState] = useState(
    options.map((sport: any) => ({ ...sport, state: false }))
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsState(
      sportsState.map((sport: any) =>
        sport.value === event.target.name
          ? { ...sport, state: event.target.checked }
          : sport
      )
    );

    setValue(
      "favoriteSport",
      sportsState.map((sport: any) =>
        sport.value === event.target.name
          ? { ...sport, state: event.target.checked }
          : sport
      )
    );
  };

  return (
    <Controller
      name="favoriteSport"
      control={control}
      rules={{
        validate: () =>
          sportsState.some((sport: any) => sport.state) ||
          validateErrorMessage,
      }}
      render={({ field }) => (
        <FormControl margin="dense" fullWidth error={!!errors.favoriteSport}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {sportsState.map((sport: any) => (
              <FormControlLabel
                key={sport.value}
                control={
                  <Checkbox
                    checked={sport.state}
                    onChange={handleChange}
                    name={sport.value}
                  />
                }
                label={sport.label}
              />
            ))}
          </FormGroup>
          {errors.favoriteSport && (
            <FormHelperText error>
              {typeof errors.favoriteSport.message === "string"
                ? errors.favoriteSport.message
                : "Invalid selection"}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
