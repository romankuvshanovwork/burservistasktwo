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
import { Controller, useForm } from "react-hook-form";

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

const RememberPasswordContainer = styled(Stack)(({ theme }) => ({
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

export default function RememberPassword() {
  const [rememberedPassword, setRememberedPassword] = React.useState("");

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = User;

  React.useEffect(() => {
    if (user.isLogedIn()) navigate("/personal");
  }, [navigate, user]);

  const onSubmit = (data: any) => {
    console.log(data);

    const result = user.rememberPassword(data?.phone);
    setRememberedPassword(result);
    console.log(result);
  };

  return (
    <>
      <RememberPasswordContainer
        direction="column"
        justifyContent="space-between"
      >
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
              Восстановить пароль
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
              {rememberedPassword && (
                <Typography variant="subtitle1" gutterBottom>
                  Ваш пароль: {rememberedPassword}
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained">
                Восстановить пароль
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Вспомнили свой пароль?{" "}
                <span>
                  <ReactRouterLink to={"/signin"}>Войти</ReactRouterLink>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </RememberPasswordContainer>
    </>
  );
}
