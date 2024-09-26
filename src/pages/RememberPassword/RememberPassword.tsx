import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../../api/UserAPI";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";
import { StyledAuthContainer } from "../../components/Styled/StyledAuthContainer/StyledAuthContainer";
import { AuthFormHeadline } from "../../components/FormComponents/AuthFormHeadline/AuthFormHeadline";
import { AuthPhoneField } from "../../components/FormComponents/FormFields/AuthPhoneField/AuthPhoneField";
import { IAPIRequestResult } from "../../interfaces/IAPIRequestResult";

export default function RememberPassword() {
  const [rememberedPassword, setRememberedPassword] = useState<
    IAPIRequestResult | undefined
  >();
  const navigate = useNavigate();
  const { isLogedIn, rememberPassword } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLogedIn()) navigate("/personal");
  }, [isLogedIn, navigate]);

  const onSubmit = (data: any) => {
    const result = rememberPassword(data?.phone);
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
            {rememberedPassword?.success && (
              <Typography variant="subtitle1" gutterBottom>
                Ваш пароль: {rememberedPassword?.result}
              </Typography>
            )}
            {rememberedPassword?.success === false && (
              <Typography sx={{color: 'red'}} variant="subtitle1" gutterBottom>
                Ошибка: {rememberedPassword?.errorMessage}
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
