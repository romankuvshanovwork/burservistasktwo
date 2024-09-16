import * as React from "react";
import Typography from "@mui/material/Typography/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  Switch,
} from "@mui/material";
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

const currencies = [
  {
    value: "Jackie Chan",
    label: "Джеки Чан",
  },
  {
    value: "Dwayne Johnson",
    label: "Дуэйн Джонсон",
  },
  {
    value: "Bruce Lee",
    label: "Брюс Ли",
  },
  {
    value: "Arnold Schwarzenegger",
    label: "Арнольд Шварценеггер",
  },
];

const actresses = [
    {
      value: "Margot Robbie",
      label: "Марго Робби",
    },
    {
      value: "Emma Watson",
      label: "Эмма Уотсон",
    },
    {
      value: "Anne Hathaway",
      label: "Энн Хэтэуэй",
    },
    {
      value: "Jennifer Lawrence",
      label: "Дженнифер Лоуренс",
    },
  ];

export default function Questionnaire() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box>
      <Typography variant="h4">Анкета для мальчиков</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Ваше имя"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="favoriteActor"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-select-currency"
              select
              fullWidth
              label="Любимый актер"
              helperText="Пожалуйста, выберите вашего любимого актера"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="favoriteColor"
          control={control}
          defaultValue={"red"}
          render={({ field }) => (
            <>
              <FormLabel id="demo-radio-buttons-group-label">
                Любимый цвет
              </FormLabel>
              <RadioGroup
                {...field}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="red"
                  control={<Radio />}
                  label="Красный"
                />
                <FormControlLabel
                  value="orange"
                  control={<Radio />}
                  label="Оранжевый"
                />
                <FormControlLabel
                  value="yellow"
                  control={<Radio />}
                  label="Желтый"
                />
                <FormControlLabel
                  value="green"
                  control={<Radio />}
                  label="Зеленый"
                />
                <FormControlLabel
                  value="blue"
                  control={<Radio />}
                  label="Голубой"
                />
                <FormControlLabel
                  value="darkBlue"
                  control={<Radio />}
                  label="Синий"
                />
                <FormControlLabel
                  value="purple"
                  control={<Radio />}
                  label="Фиолетовый"
                />
              </RadioGroup>
            </>
          )}
        />
        <Controller
          name="favoriteSport"
          control={control}
          render={({ field }) => (
            <>
              <FormLabel>Любимый/любимые виды спорта/игр (Выберите один или несколько вариантов ответа)</FormLabel>
              <FormGroup {...field}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Футбол"
                />
                <FormControlLabel control={<Checkbox />} label="Баскетбол" />
                <FormControlLabel control={<Checkbox />} label="Компьютерные игры" />
                <FormControlLabel control={<Checkbox />} label="Шахматы" />
                <FormControlLabel control={<Checkbox />} label="Настольные игры" />
              </FormGroup>
            </>
          )}
        />
        <Controller
          name="sign"
          control={control}
          render={({ field }) => (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              fullWidth
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Загрузите вашу подпись
              <VisuallyHiddenInput
                {...field}
                type="file"
                onChange={(event) => console.log(event.target.files)}
              />
            </Button>
          )}
        />
        <Controller
          name="agreement"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} />}
              label="Я согласен с обработкой моих персональных данных"
            />
          )}
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}
