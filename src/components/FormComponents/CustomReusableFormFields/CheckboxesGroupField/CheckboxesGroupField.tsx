import {
  Control,
  FieldErrors,
  Controller,
  UseFormSetValue,
  FieldValues,
  UseFormTrigger,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { useState } from "react";

export function CheckboxesGroupField({
  control,
  errors,
  options,
  label,
  validateErrorMessage,
  name,
  setValue,
  trigger,
}: {
  control: Control;
  errors: FieldErrors;
  options: any;
  label: string;
  validateErrorMessage: string;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}) {
  const [optionsState, setOptionsState] = useState(
    options.map((option: any) => ({ ...option, state: false }))
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextOptions = optionsState.map((option: any) =>
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
      defaultValue={options.map((option: any) => ({ ...option, state: false }))}
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
            {optionsState.map((option: any) => (
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
