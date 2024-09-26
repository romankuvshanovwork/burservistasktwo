import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../../api/User";
import { useQuestionnaireStore } from "../../api/QuestionnaireAPI";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { StyledCard } from "../../components/Styled/StyledCard/StyledCard";
import { AuthFormHeadline } from "../../components/FormComponents/AuthFormHeadline/AuthFormHeadline";
import { AuthPhoneField } from "../../components/FormComponents/FormFields/AuthPhoneField/AuthPhoneField";
import { AuthPasswordFields } from "../../components/FormComponents/FormFields/AuthPasswordFields/AuthPasswordFields";
import { IAPIRequestResult } from "../../interfaces/IAPIRequestResult";

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
  const [signInResult, setSignInResult] = useState<
    IAPIRequestResult | undefined
  >();

  const navigate = useNavigate();
  const { login, isLogedIn, amountOfRegisteredUsers } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { amountOfQuestionnaires } = useQuestionnaireStore();

  useEffect(() => {
    if (isLogedIn()) navigate("/personal");
  }, [isLogedIn, navigate]);

  const onSubmit = (data: any) => {
    const result = login(data?.phone, data?.password);
    if (result.success === true) navigate("/personal");
    else setSignInResult(result);
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <StyledCard variant="outlined">
        <AuthFormHeadline headline="Войти" />
        <Box>
          <Typography variant="subtitle1">
            Количество зарегистрировавшихся пользователей:{" "}
            {amountOfRegisteredUsers()}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Количество анкет: {amountOfQuestionnaires()}
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
          <AuthPhoneField control={control} errors={errors} />
          <AuthPasswordFields control={control} errors={errors} />
          <Typography sx={{ color: "red" }}>
            {signInResult?.errorMessage}
          </Typography>
          <Button type="submit" fullWidth variant="contained">
            Войти
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Нет аккаунта?{" "}
            <ReactRouterLink to={"/signup"}>Зарегистрироваться</ReactRouterLink>
          </Typography>
        </Box>
      </StyledCard>
    </SignInContainer>
  );
}
