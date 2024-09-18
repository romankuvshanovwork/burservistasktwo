import Button from "@mui/material/Button/Button";

export function FormSubmitButton({ label = "Отправить анкету" }: { label: string }) {
  return (
    <Button fullWidth type="submit" variant="contained" color="primary">
      {label}
    </Button>
  );
}
