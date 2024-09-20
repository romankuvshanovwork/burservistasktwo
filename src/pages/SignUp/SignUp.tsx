import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { GENDERS } from "../../constants/genders";
import { User } from "../../api/User";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";
import { StyledAuthContainer } from "../../components/Styled/StyledAuthContainer/StyledAuthContainer";

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
      <StyledAuthContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: "center",
            height: "100dvh",
            p: 2,
          }}
        >
          <StyledCard variant="outlined">
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
                    <FormLabel htmlFor="password">Пароль</FormLabel>
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
              <Typography sx={{ textAlign: "center" }}>
                <ReactRouterLink to={"/rememberpassword"}>
                  Забыли пароль?
                </ReactRouterLink>
              </Typography>
            </Box>
          </StyledCard>
        </Stack>
      </StyledAuthContainer>
    </>
  );
}
