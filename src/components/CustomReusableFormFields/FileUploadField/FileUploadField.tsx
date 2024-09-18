import {
  Control,
  Controller,
  UseFormSetValue,
  FieldValues,
  FieldErrors,
} from "react-hook-form";
import { FormHelperText, styled } from "@mui/material";
import { useState } from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function FileUploadField({
  control,
  errors,
  validateErrorMessage,
  label,
  accept,
  name,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  validateErrorMessage: string;
  label: string;
  accept: string;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: validateErrorMessage }}
      render={({ field }) => (
        <FormControl
          sx={{ marginTop: "8px", marginBottom: "8px" }}
          fullWidth
          error={!!errors?.[name]}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {fileName ? fileName : label}
            <VisuallyHiddenInput
              type="file"
              accept={accept}
              onChange={(event) => {
                setFileName(event.target.files?.[0]?.name || "");
                setValue(name, event.target.files?.[0]?.name || "");
              }}
            />
          </Button>
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
