import Typography from "@mui/material/Typography/Typography";
import { QUIZ_DATA } from "../../../constants/quizData";

export function QuizLearnParagraphSection({
  paragraph = QUIZ_DATA.paragraph,
}: {
  paragraph?: string;
}) {
  return (
    <>
      <Typography variant="h6">
        Прочитайте параграф и ответьте на вопросы
      </Typography>
      <Typography sx={{ textAlign: "justify", marginBottom: "25px" }}>
        {paragraph}
      </Typography>
    </>
  );
}
