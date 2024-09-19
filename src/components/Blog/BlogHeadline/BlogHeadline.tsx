import Typography from "@mui/material/Typography/Typography";

export function BlogHeadline({ headline = "Новости" }: { headline: string }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {headline}
      </Typography>
    </div>
  );
}
