import Typography from "@mui/material/Typography/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { BlogAuthor } from "../BlogAuthor/BlogAuthor";
import { IBlogCardData } from "../../../interfaces/IBlogCardData";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export function BlogCard({ cardData }: { cardData: IBlogCardData }) {
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <SyledCard
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      className={focused ? "Mui-focused" : ""}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={cardData.img}
        aspect-ratio="16 / 9"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <SyledCardContent>
        <Typography gutterBottom variant="caption" component="div">
          {cardData.tag}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {cardData.title}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {cardData.description}
        </StyledTypography>
      </SyledCardContent>
      <BlogAuthor authors={cardData.authors} />
    </SyledCard>
  );
}
