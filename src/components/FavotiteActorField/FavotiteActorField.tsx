import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors, Controller } from "react-hook-form";

export function FavoriteActorField({
  control,
  errors,
  options,
  label,
  helperText,
  errorRequiredText,
}: {
  control: Control;
  errors: FieldErrors;
  options: any;
  label: string;
  helperText: string;
  errorRequiredText: string;
}) {
  return (
    <Controller
      name="favoriteActor"
      control={control}
      defaultValue=""
      rules={{ required: errorRequiredText }}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-select-favorite-actor"
          select
          fullWidth
          label={label}
          margin="normal"
          error={!!errors.favoriteActor}
          helperText={
            errors.favoriteActor
              ? (errors.favoriteActor.message as string)
              : helperText
          }
        >
          {options.map((actor: any) => (
            <MenuItem key={actor.value} value={actor.value}>
              {actor.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
