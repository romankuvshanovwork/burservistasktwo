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
import { TYPES_OF_SPORT } from "../../constants/typesOfSport";

export function FavoriteSportField({
  control,
  errors,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [sportsState, setSportsState] = useState(
    TYPES_OF_SPORT.map((sport) => ({ ...sport, state: false }))
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsState(
      sportsState.map((sport) =>
        sport.value === event.target.name
          ? { ...sport, state: event.target.checked }
          : sport
      )
    );

    setValue(
      "favoriteSport",
      sportsState.map((sport) =>
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
          sportsState.some((sport) => sport.state) ||
          "Выберите хотя бы один вид спорта",
      }}
      render={({ field }) => (
        <FormControl margin="dense" fullWidth error={!!errors.favoriteSport}>
          <FormLabel component="legend">Любимый/любимые виды спорта*</FormLabel>
          <FormGroup>
            {sportsState.map((sport) => (
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
