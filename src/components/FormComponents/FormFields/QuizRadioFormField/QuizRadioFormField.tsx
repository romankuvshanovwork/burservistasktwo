import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { Control, Controller, FieldErrors } from "react-hook-form";

export function QuizRadioFormField({
  control,
  errors,
  quiz_element,
}: {
  control: Control;
  errors: FieldErrors;
  quiz_element: any;
}) {
  return (
    <Controller
      name={quiz_element.id.toFixed()}
      key={quiz_element.id}
      defaultValue={""}
      control={control}
      rules={{ required: "Ответ на этот вопрос обязателен" }}
      render={({ field }) => (
        <FormControl
          sx={{ marginBottom: "8px" }}
          margin="dense"
          fullWidth
          error={!!errors.favoriteColor}
        >
          <FormLabel id="favorite-color-radio-buttons-group-label">
            {quiz_element.question}
          </FormLabel>
          <RadioGroup
            {...field}
            aria-labelledby="favorite-color-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {quiz_element.options.map((option: any) => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={option}
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
