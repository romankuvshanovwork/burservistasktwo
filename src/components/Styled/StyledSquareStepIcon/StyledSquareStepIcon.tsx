import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";
import { styled } from "@mui/material/styles";

export const StyledSquareStepIcon = styled("div")<{ correct: boolean }>(
  ({ correct }) => ({
    width: 30,
    height: 30,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: correct ? green[600] : red[600],
    color: "white",
    fontSize: "16px",
  })
);
