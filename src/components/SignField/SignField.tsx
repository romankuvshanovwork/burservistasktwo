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

export function SignField({
  control,
  errors,
  setValue,
}: {
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <Controller
      name="sign"
      control={control}
      rules={{ required: "Загрузка подписи обязательна" }}
      render={({ field }) => (
        <FormControl
          sx={{ marginTop: "8px", marginBottom: "8px" }}
          fullWidth
          error={!!errors.sign}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {fileName ? fileName : "Загрузите вашу подпись*"}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFileName(event.target.files?.[0]?.name || "");
                setValue("sign", event.target.files?.[0]?.name || "");
              }}
            />
          </Button>
          {errors.sign && (
            <FormHelperText error>
              {typeof errors.sign.message === "string"
                ? errors.sign.message
                : "Invalid selection"}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
