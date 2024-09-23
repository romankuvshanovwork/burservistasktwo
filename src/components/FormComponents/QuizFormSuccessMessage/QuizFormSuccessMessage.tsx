import Typography from "@mui/material/Typography/Typography";

export function QuizFormSuccessMessage({
  amountOfPoints,
  maxAmountOfPoints,
}: {
  amountOfPoints: number;
  maxAmountOfPoints: number;
}) {
  return (
    <Typography>
      Ваш результат: {amountOfPoints} балла (баллов) из {maxAmountOfPoints}
    </Typography>
  );
}
