import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export function FormSuccessMessage() {
  return (
    <Box sx={{ maxWidth: "500px", marginTop: "50px", marginX: "auto" }}>
      <Typography variant="h4">Форма успешно отправлена!</Typography>
    </Box>
  );
}
