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
  MenuItem,
  Radio,
  RadioGroup,
  styled,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { List } from "../List/List";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";

const toBase64 = (file?: Blob) =>
  new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    }
  });

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

const actors = [
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

const colors = [
  {
    value: "red",
    label: "Красный",
  },
  {
    value: "orange",
    label: "Оранжевый",
  },
  {
    value: "yellow",
    label: "Желтый",
  },
  {
    value: "green",
    label: "Зеленый",
  },
  {
    value: "blue",
    label: "Голубой",
  },
  {
    value: "darkBlue",
    label: "Синий",
  },
  {
    value: "purple",
    label: "Фиолетовый",
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

const sports = [
  {
    value: "Football",
    label: "Футбол",
  },
  {
    value: "Basketball",
    label: "Баскетбол",
  },
  {
    value: "Swimming",
    label: "Плавание",
  },
  {
    value: "Golf",
    label: "Гольф",
  },
  {
    value: "Volleyball ",
    label: "Волейбол ",
  },
];

const ITEMS = [
  {
    id: 1,
    text: "Играть в компьютерные игры",
  },
  {
    id: 2,
    text: "Читать книги",
  },
  {
    id: 3,
    text: "Заниматься спортом",
  },
  {
    id: 4,
    text: "Смотреть фильмы",
  },
  {
    id: 5,
    text: "Играть с друзьями",
  },
  {
    id: 6,
    text: "Рисовать",
  },
];

export default function Questionnaire() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sportsState, setSportsState] = React.useState(
    sports.map((sport) => ({ ...sport, state: false }))
  );
  const [cards, setCards] = React.useState(ITEMS);
  const [fileName, setFileName] = React.useState("");
  const [formSent, setFormSent] = React.useState(false);

  const questionnaire = QuestionnaireAPI;
  const user = User;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsState(
      sportsState.map((sport) =>
        sport.value === event.target.name
          ? { ...sport, state: event.target.checked }
          : sport
      )
    );
  };

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      favoriteSport: sportsState,
      freeTimeActivities: cards,
      sign: fileName,
    });
    if (user.isLogedIn() && user.currentUser()) {
      questionnaire.addNewQuestionnaire(user.currentUser(), {
        ...data,
        favoriteSport: sportsState,
        freeTimeActivities: cards,
        sign: fileName,
      });
      setFormSent(true);
    }
  };

  if (!formSent)
    return (
      <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
        <Typography variant="h4">Анкета для мальчиков</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "Имя обязательно" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ваше имя*"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={
                  errors.firstName ? (errors.firstName.message as string) : ""
                }
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Фамилия обязательна" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ваша фамилия*"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={
                  errors.lastName ? (errors.lastName.message as string) : ""
                }
              />
            )}
          />
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
                  errors.favoriteActor ? (errors.favoriteActor.message as string) : "Пожалуйста, выберите вашего любимого актера"
                }
              >
                {actors.map((actor) => (
                  <MenuItem key={actor.value} value={actor.value}>
                    {actor.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="favoriteColor"
            control={control}
            defaultValue={"red"}
            rules={{ required: "Выбор любимого цвета обязателен" }}
            render={({ field }) => (
              <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Любимый цвет
                </FormLabel>
                <RadioGroup
                  {...field}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {colors.map((color) => (
                    <FormControlLabel
                      value={color.value}
                      key={color.value}
                      control={<Radio />}
                      label={color.label}
                    />
                  ))}
                </RadioGroup>
              </Box>
            )}
          />
          <Controller
            name="favoriteSport"
            control={control}
            render={({ field }) => (
              <Box sx={{ marginTop: "16px", marginBottom: "8px" }}>
                <FormLabel component="legend">
                  Любимый/любимые виды спорта
                </FormLabel>
                <FormGroup>
                  {sportsState.map((sport) => (
                    <FormControlLabel
                      key={sport.value}
                      control={
                        <Checkbox
                          checked={sport.state}
                          onChange={handleChange}
                          name={sport.value}
                        />
                      }
                      label={sport.label}
                    />
                  ))}
                </FormGroup>
              </Box>
            )}
          />
          <Controller
            name="freeTimeActivities"
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "8px",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              >
                <FormLabel id="free-time-activities-group-label">
                  Распределите по порядку, что вам больше всего нравится делать
                  в свободное время:
                </FormLabel>
                <List cards={cards} onCardsChange={setCards} />
              </Box>
            )}
          />
          <Controller
            name="sign"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                role={undefined}
                variant="contained"
                fullWidth
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Загрузите вашу подпись
                <VisuallyHiddenInput
                  {...field}
                  required
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    setFileName(event.target.files?.[0]?.name || "");
                  }}
                />
              </Button>
            )}
          />
          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ marginX: "auto", marginY: "8px" }}
                control={<Switch required {...field} />}
                label="Я согласен с обработкой моих персональных данных"
              />
            )}
          />
          <Button fullWidth type="submit" variant="contained" color="primary">
            Отправить анкету
          </Button>
        </form>
      </Box>
    );
  else {
    return (
      <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
        <Typography variant="h4">Форма успешно отправлена!</Typography>
      </Box>
    );
  }
}
