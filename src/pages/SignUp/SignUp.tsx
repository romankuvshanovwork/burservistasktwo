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
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
  const [signUpResult, setSignUpResult] = useState<string | boolean>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   TODO: Сделать через конструктор и new
  const user = User;

  useEffect(() => {
    if (user.isLogedIn()) navigate("/personal");
  }, [navigate, user]);

  const onSubmit = (data: any) => {
    console.log(data);

    const result = user.register(
      data?.phone,
      data?.password,
      data?.fio,
      data?.gender
    );
    if (result === true) navigate("/personal");
    else setSignUpResult(result);
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Номер телефона обязателен",
                  pattern: {
                    value: /^((\+7)+([0-9]){10})$/,
                    message:
                      "Пожалуйста, введите корректный номер телефона. Пример: +79990001234",
                  },
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="phone">Телефон</FormLabel>
                    <TextField
                      {...field}
                      error={!!errors?.phone}
                      helperText={
                        errors.phone ? (errors.phone.message as string) : ""
                      }
                      id="phone"
                      type="tel"
                      placeholder="+79990001234"
                      autoComplete="phone"
                      autoFocus
                      fullWidth
                      variant="outlined"
                      color={!!errors?.phone ? "error" : "primary"}
                      sx={{ ariaLabel: "phone" }}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="fio"
                control={control}
                defaultValue=""
                rules={{
                  required: "ФИО обязательно",
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="phone">ФИО</FormLabel>
                    <TextField
                      {...field}
                      error={!!errors?.fio}
                      helperText={
                        errors.fio ? (errors.fio.message as string) : ""
                      }
                      autoComplete="name"
                      fullWidth
                      id="fio"
                      placeholder="Фамилия Имя Отчество"
                      color={!!errors?.fio ? "error" : "primary"}
                      sx={{ ariaLabel: "phone" }}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="gender"
                control={control}
                defaultValue="male"
                render={({ field }) => (
                  <FormControl sx={{ marginTop: "20px" }}>
                    <TextField
                      {...field}
                      id="gender"
                      select
                      fullWidth
                      label="Пол"
                      helperText="Пожалуйста, выберите свой пол"
                    >
                      {GENDERS.map((gender) => (
                        <MenuItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен быть не короче 6 символов",
                  },
                }}
                render={({ field }) => (
                  <FormControl>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <FormLabel htmlFor="password">Пароль</FormLabel>
                      <ReactRouterLink to={"/rememberpassword"}>
                        Забыли пароль?
                      </ReactRouterLink>
                    </Box>
                    <TextField
                      {...field}
                      error={!!errors?.password}
                      helperText={
                        errors.password
                          ? (errors.password.message as string)
                          : ""
                      }
                      name="password"
                      placeholder="••••••"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      autoFocus
                      fullWidth
                      variant="outlined"
                      color={!!errors?.password ? "error" : "primary"}
                    />
                  </FormControl>
                )}
              />
              <Typography>{signUpResult}</Typography>
              <Button type="submit" fullWidth variant="contained">
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
