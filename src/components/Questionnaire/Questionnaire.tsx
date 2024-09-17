import * as React from "react";
import Typography from "@mui/material/Typography/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
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
import { ACTORS } from "../../constants/actors";
import { COLORS } from "../../constants/colors";
import { TYPES_OF_SPORT } from "../../constants/typesOfSport";
import { FREE_TIME_ACTIVITIES } from "../../constants/freeTimeActivities";

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

export default function Questionnaire() {
  const {
    control,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm();

  const [sportsState, setSportsState] = React.useState(
    TYPES_OF_SPORT.map((sport) => ({ ...sport, state: false }))
  );
  const [cards, setCards] = React.useState(FREE_TIME_ACTIVITIES);
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

  //   React.useEffect(() => {
  //     const isTouched = getFieldState('favoriteSport').isTouched;
  //     if (isTouched) trigger("favoriteSport");
  //   }, [trigger, sportsState, getFieldState]);

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(data?.sign?.files?.[0]);
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
          <Controller
            name="favoriteColor"
            control={control}
            defaultValue={"red"}
            rules={{ required: "Выбор любимого цвета обязателен" }}
            render={({ field }) => (
              <FormControl
                sx={{ marginBottom: "8px" }}
                margin="dense"
                fullWidth
                error={!!errors.favoriteColor}
              >
                <FormLabel id="favorite-color-radio-buttons-group-label">
                  Любимый цвет*
                </FormLabel>
                <RadioGroup
                  {...field}
                  aria-labelledby="favorite-color-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {COLORS.map((color) => (
                    <FormControlLabel
                      value={color.value}
                      key={color.value}
                      control={<Radio />}
                      label={color.label}
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
          <Controller
            name="favoriteSport"
            control={control}
            rules={{
              validate: () =>
                sportsState.some((sport) => sport.state) ||
                "Выберите хотя бы один вид спорта",
            }}
            render={({ field }) => (
              <FormControl
                margin="dense"
                fullWidth
                error={!!errors.favoriteSport}
              >
                <FormLabel component="legend">
                  Любимый/любимые виды спорта*
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
                {errors.favoriteSport && (
                  <FormHelperText error>
                    {typeof errors.favoriteSport.message === "string"
                      ? errors.favoriteSport.message
                      : "Invalid selection"}
                  </FormHelperText>
                )}
              </FormControl>
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
                  marginTop: "8px",
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
            defaultValue={""}
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
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFileName(event.target.files?.[0]?.name || "");
                      field.onChange(event.target.value);
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
          <Controller
            name="agreement"
            control={control}
            rules={{ required: "Согласие обязательно" }}
            render={({ field }) => (
              <FormControl
                sx={{ marginX: "auto", marginY: "8px" }}
                fullWidth
                error={!!errors.agreement}
              >
                <FormControlLabel
                  sx={{ marginX: "auto" }}
                  control={<Switch {...field} />}
                  label="Я согласен с обработкой моих персональных данных"
                />
                {errors.agreement && (
                  <FormHelperText error>
                    {typeof errors.agreement.message === "string"
                      ? errors.agreement.message
                      : "Invalid selection"}
                  </FormHelperText>
                )}
              </FormControl>
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
