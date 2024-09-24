import Typography from "@mui/material/Typography/Typography";

export function QuizHeadline({ headline = "Викторина" }: { headline: string }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        {headline}
      </Typography>
    </div>
  );
}
