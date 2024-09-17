import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { ACTORS } from "../../constants/actors";

export function FavoriteActorField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="favoriteActor"
      control={control}
      defaultValue=""
      rules={{ required: "Выбор любимого актера обязателен" }}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-select-favorite-actor"
          select
          fullWidth
          label="Любимый актер*"
          margin="normal"
          error={!!errors.favoriteActor}
          helperText={
            errors.favoriteActor
              ? (errors.favoriteActor.message as string)
              : "Пожалуйста, выберите вашего любимого актера"
          }
        >
          {ACTORS.map((actor) => (
            <MenuItem key={actor.value} value={actor.value}>
              {actor.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
