import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { User } from "../../api/User";
import { QuestionnaireAPI } from "../../api/QuestionnaireAPI";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";

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

export default function SignIn() {
  const [amountOfRegisteredUsers, setAmountOfRegisteredUsers] = useState<
    number | undefined
  >();
  const [amountOfQuestionnaires, setAmountOfQuestionnaires] = useState<
    number | undefined
  >();
  const [signInResult, setSignInResult] = useState<string | boolean>();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = User;
  const questionnaire = QuestionnaireAPI;

  useEffect(() => {
    if (user.isLogedIn()) navigate("/personal");
  }, [navigate, user]);

  useEffect(
    () => setAmountOfRegisteredUsers(user.amountOfRegisteredUsers),
    [user.amountOfRegisteredUsers]
  );

  useEffect(
    () => setAmountOfQuestionnaires(questionnaire.amountOfQuestionnaires),
    [questionnaire.amountOfQuestionnaires]
  );

  const onSubmit = (data: any) => {
    console.log(data);
    const result = user.login(data?.phone, data?.password);
    if (result === true) navigate("/personal");
    else setSignInResult(result);
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <StyledCard variant="outlined">
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <ReactRouterLink to={"/rememberpassword"}>
                    Забыли пароль?
                  </ReactRouterLink>
                </Box>
                <TextField
                  {...field}
                  error={!!errors?.password}
                  helperText={
                    errors.password ? (errors.password.message as string) : ""
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
          <Typography>{signInResult}</Typography>
          <Button type="submit" fullWidth variant="contained">
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
      </StyledCard>
    </SignInContainer>
  );
}
