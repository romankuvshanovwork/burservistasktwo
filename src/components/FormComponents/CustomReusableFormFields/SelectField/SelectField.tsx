import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField/TextField";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { ISelectFieldOption } from "../../../../interfaces/ISelectFieldOption";

export function SelectField({
  control,
  errors,
  options,
  label,
  helperText,
  errorRequiredText,
  name,
  selectId,
}: {
  control: Control;
  errors: FieldErrors;
  options: ISelectFieldOption[];
  label: string;
  helperText: string;
  errorRequiredText: string;
  name: string;
  selectId: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: errorRequiredText }}
      render={({ field }) => (
        <TextField
          {...field}
          id={selectId}
          select
          fullWidth
          label={label}
          margin="normal"
          error={!!errors?.[name]}
          helperText={
            errors?.[name] ? (errors?.[name]?.message as string) : helperText
          }
        >
          {options.map((option: ISelectFieldOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
