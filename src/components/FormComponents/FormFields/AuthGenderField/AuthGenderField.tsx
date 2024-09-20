import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField/TextField";
import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { GENDERS } from "../../../../constants/genders";
import MenuItem from "@mui/material/MenuItem/MenuItem";

export function AuthGenderField({ control }: { control: Control }) {
  return (
    <Controller
      name="gender"
      control={control}
      defaultValue="male"
      render={({ field }) => (
        <FormControl sx={{ marginTop: "20px" }}>
          <TextField
            {...field}
            id="gender"
            select
            fullWidth
            label="Пол"
            helperText="Пожалуйста, выберите свой пол"
          >
            {GENDERS.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      )}
    />
  );
}
