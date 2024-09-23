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
import { ICheckboxesGroupFieldOption } from "../../../../interfaces/ICheckboxesGroupFieldOption";

export function CheckboxesGroupField({
  control,
  errors,
  options,
  label,
  validateErrorMessage,
  name,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  options: ICheckboxesGroupFieldOption[];
  label: string;
  validateErrorMessage: string;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [optionsState, setOptionsState] = useState(
    options.map((option) => ({ ...option, state: false }))
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextOptions = optionsState.map((option) =>
      option.value === event.target.name
        ? { ...option, state: event.target.checked }
        : option
    );

    setOptionsState(nextOptions);
    setValue(name, nextOptions, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options.map((option) => ({ ...option, state: false }))}
      rules={{
        validate: (value) => {
          return (
            value.some((option: any) => option.state) || validateErrorMessage
          );
        },
      }}
      render={({ field }) => (
        <FormControl margin="dense" fullWidth error={!!errors?.[name]}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {optionsState.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={option.state}
                    onChange={handleChange}
                    name={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
          {errors?.[name] && (
            <FormHelperText error>
              {errors?.[name]?.message?.toString() || ""}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
