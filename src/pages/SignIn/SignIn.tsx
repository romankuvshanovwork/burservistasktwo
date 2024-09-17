import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");

  const [amountOfRegisteredUsers, setAmountOfRegisteredUsers] = React.useState<
    number | undefined
  >();
  const [amountOfQuestionnaires, setAmountOfQuestionnaires] = React.useState<
    number | undefined
  >();

  const navigate = useNavigate();

  const user = User;
  const questionnaire = QuestionnaireAPI;

  React.useEffect(() => {
    if (user.isLogedIn()) navigate("/personal");
  }, [navigate, user]);

  React.useEffect(
    () => setAmountOfRegisteredUsers(user.amountOfRegisteredUsers),
    [user.amountOfRegisteredUsers]
  );

  React.useEffect(
    () => setAmountOfQuestionnaires(questionnaire.amountOfQuestionnaires),
    [questionnaire.amountOfQuestionnaires]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;
    const phone = data.get("phone") as string;

    console.log({
      password: password,
      phone: phone,
    });

    const result = user.login(phone, password);
    if (result) navigate("/personal");
  };

  const validateInputs = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Пароль должен быть не короче 6 символов");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!phone.value || !/^((\+7)+([0-9]){10})$/.test(phone.value)) {
      setPhoneError(true);
      setPhoneErrorMessage(
        "Пожалуйста, введите корректный номер телефона. Пример: +79990001234"
      );
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      {/* TODO: Переделать на react-hook-form */}
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Войти
          </Typography>
          <Box>
            <Typography variant="subtitle1">
              Количество зарегистрировавшихся пользователей:{" "}
              {amountOfRegisteredUsers}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Количество анкет: {amountOfQuestionnaires}
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="phone">Телефон</FormLabel>
              <TextField
                error={phoneError}
                helperText={phoneErrorMessage}
                id="phone"
                type="tel"
                name="phone"
                placeholder="+79990001234"
                autoComplete="phone"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={phoneError ? "error" : "primary"}
                sx={{ ariaLabel: "phone" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <ReactRouterLink to={"/rememberpassword"}>
                  Забыли пароль?
                </ReactRouterLink>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Войти
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Нет аккаунта?{" "}
              <span>
                <ReactRouterLink to={"/signup"}>
                  Зарегистрироваться
                </ReactRouterLink>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
