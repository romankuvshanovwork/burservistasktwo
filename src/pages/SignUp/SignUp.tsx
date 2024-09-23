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
import { AuthPasswordFields } from "../../components/FormComponents/FormFields/AuthPasswordFields/AuthPasswordFields";
import { AuthFIOField } from "../../components/FormComponents/FormFields/AuthFIOFIeld/AuthFIOFIeld";
import { AuthGenderField } from "../../components/FormComponents/FormFields/AuthGenderField/AuthGenderField";
import { IAPIRequestResult } from "../../interfaces/IAPIRequestResult";

export default function SignUp() {
  const [signUpResult, setSignUpResult] = useState<
  IAPIRequestResult | undefined
>();
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
    const result = user.register(
      data?.phone,
      data?.password,
      data?.fio,
      data?.gender
    );
    if (result.success === true) navigate("/personal");
    else setSignUpResult(result);
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
          <AuthFormHeadline headline="Зарегистрироваться" />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <AuthPhoneField control={control} errors={errors} />
            <AuthFIOField control={control} errors={errors} />
            <AuthGenderField control={control} />
            <AuthPasswordFields control={control} errors={errors} />
            <Typography sx={{color: 'red', textAlign: 'center'}}>{signUpResult?.errorMessage}</Typography>
            <Button type="submit" fullWidth variant="contained">
              Зарегистрироваться
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Уже есть аккаунт?{" "}
              <ReactRouterLink to={"/signin"}>Войти</ReactRouterLink>
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
  );
}
