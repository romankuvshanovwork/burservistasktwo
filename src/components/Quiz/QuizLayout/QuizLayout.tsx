import Box from "@mui/material/Box/Box";
import { QuizHeadline } from "../QuizHeadline/QuizHeadline";
import { ReactNode } from "react";

export function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        maxWidth: "500px",
        marginTop: "50px",
        marginX: "auto",
      }}
    >
      <QuizHeadline headline="Викторина" />
      {children}
    </Box>
  );
}
