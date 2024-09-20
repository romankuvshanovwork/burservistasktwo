import Typography from "@mui/material/Typography/Typography";

export function AuthFormHeadline({ headline = "Войти" }: { headline: string }) {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
    >
      {headline}
    </Typography>
  );
}
