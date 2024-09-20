import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { User } from "../../api/User";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";
import { StyledAuthContainer } from "../../components/Styled/StyledAuthContainer/StyledAuthContainer";
import { AuthFormHeadline } from "../../components/FormComponents/AuthFormHeadline/AuthFormHeadline";
import { AuthPhoneField } from "../../components/FormComponents/FormFields/AuthPhoneField/AuthPhoneField";

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
    const result = user.rememberPassword(data?.phone);
    setRememberedPassword(result);
  };

  return (
    <StyledAuthContainer direction="column" justifyContent="space-between">
      <Stack
        sx={{
          justifyContent: "center",
          height: "100dvh",
          p: 2,
        }}
      >
        <StyledCard variant="outlined">
          <AuthFormHeadline headline="Восстановить пароль" />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <AuthPhoneField control={control} errors={errors} />
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
              <ReactRouterLink to={"/signin"}>Войти</ReactRouterLink>
            </Typography>
          </Box>
        </StyledCard>
      </Stack>
    </StyledAuthContainer>
  );
}
