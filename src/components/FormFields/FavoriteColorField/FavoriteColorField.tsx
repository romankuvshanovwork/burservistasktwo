import { Control, FieldErrors, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import { COLORS } from "../../../constants/colors";
import Radio from "@mui/material/Radio/Radio";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";

export function FavoriteColorField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="favoriteColor"
      control={control}
      defaultValue={"red"}
      rules={{ required: "Выбор любимого цвета обязателен" }}
      render={({ field }) => (
        <FormControl
          sx={{ marginBottom: "8px" }}
          margin="dense"
          fullWidth
          error={!!errors.favoriteColor}
        >
          <FormLabel id="favorite-color-radio-buttons-group-label">
            Любимый цвет*
          </FormLabel>
          <RadioGroup
            {...field}
            aria-labelledby="favorite-color-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {COLORS.map((color) => (
              <FormControlLabel
                value={color.value}
                key={color.value}
                control={<Radio />}
                label={color.label}
              />
            ))}
          </RadioGroup>
          {errors.favoriteColor && (
            <FormHelperText error>
              {typeof errors.favoriteColor.message === "string"
                ? errors.favoriteColor.message
                : "Invalid selection"}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
