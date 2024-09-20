import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { User } from "../../api/User";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";
import { StyledAuthContainer } from "../../components/Styled/StyledAuthContainer/StyledAuthContainer";

export default function RememberPassword() {
  const [rememberedPassword, setRememberedPassword] = useState("");

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = User;

  useEffect(() => {
    if (user.isLogedIn()) navigate("/personal");
  }, [navigate, user]);

  const onSubmit = (data: any) => {
    console.log(data);

    const result = user.rememberPassword(data?.phone);
    setRememberedPassword(result);
    console.log(result);
  };

  return (
    <StyledAuthContainer
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
        <StyledCard variant="outlined">
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
        </StyledCard>
      </Stack>
    </StyledAuthContainer>
  );
}
