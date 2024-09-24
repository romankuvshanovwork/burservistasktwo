import Box from "@mui/material/Box/Box";
import { QuizHeadline } from "../QuizHeadline/QuizHeadline";
import { ReactNode } from "react";

export function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{marginTop: '50px'}}>
      <QuizHeadline headline="Викторина" />
      {children}
    </Box>
  );
}
