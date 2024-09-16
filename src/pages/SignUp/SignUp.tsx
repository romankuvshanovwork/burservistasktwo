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
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { GENDERS } from "../../constants/genders";
import { User } from "../../api/User";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp() {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [fioError, setFioError] = React.useState(false);
  const [fioErrorMessage, setFioErrorMessage] = React.useState("");
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");

  const navigate = useNavigate();

  //   TODO: Сделать через конструктор и new
  const user = User;

  React.useEffect(() => {
    if (user.isLogedIn) navigate("/personal");
  }, [navigate, user.isLogedIn]);

  const validateInputs = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const fio = document.getElementById("fio") as HTMLInputElement;
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

    if (!fio.value || fio.value.length < 1) {
      setFioError(true);
      setFioErrorMessage("ФИО обязательно");
      isValid = false;
    } else {
      setFioError(false);
      setFioErrorMessage("");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const phone = data.get("phone") as string;
    const fio = data.get("fio") as string;
    const password = data.get("password") as string;
    const gender = data.get("gender") as string;

    console.log({
      fio: fio,
      phone: phone,
      password: password,
      gender: gender,
    });
    user.register(phone, password, fio, gender);
  };

  return (
    <>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: "center",
            height: "100dvh",
            p: 2,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Зарегистрироваться
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                <FormLabel htmlFor="fio">ФИО</FormLabel>
                <TextField
                  autoComplete="name"
                  name="fio"
                  required
                  fullWidth
                  id="fio"
                  placeholder="Фамилия Имя Отчество"
                  error={fioError}
                  helperText={fioErrorMessage}
                  color={fioError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl sx={{ marginTop: "20px" }}>
                <TextField
                  id="gender"
                  name="gender"
                  required
                  select
                  fullWidth
                  label="Пол"
                  defaultValue="male"
                  helperText="Пожалуйста, выберите свой пол"
                >
                  {GENDERS.map((gender) => (
                    <MenuItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Зарегистрироваться
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Уже есть аккаунт?{" "}
                <span>
                  <ReactRouterLink to={"/signin"}>Войти</ReactRouterLink>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </>
  );
}
