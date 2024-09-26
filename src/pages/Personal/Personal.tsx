import { useUserStore } from "../../api/User";
import Blog from "../../components/Blog/Blog";
import Container from "@mui/material/Container/Container";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import { useEffect } from "react";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid2";
import Quiz from "../../components/Quiz/Quiz";

export default function Personal() {
  const navigate = useNavigate();
  const { isLogedIn, currentUser } = useUserStore();

  useEffect(() => {
    if (!isLogedIn()) navigate("/signin");
  }, [isLogedIn, navigate]);

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 16,
        gap: 4,
        marginTop: "35px",
        backgroundColor: "#fcfcfc",
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid size="grow">
          <Typography sx={{ wordBreak: "break-all" }} variant="h3" gutterBottom>
            Привет, {currentUser?.fio}
          </Typography>
        </Grid>
        <Grid size={1}>
          <Button onClick={() => navigate("/logout")} variant="contained">
            Выйти
          </Button>
        </Grid>
      </Grid>
      <Blog />
      <Questionnaire />
      <Quiz />
    </Container>
  );
}
