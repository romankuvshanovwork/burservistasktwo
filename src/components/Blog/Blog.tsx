import * as React from "react";
import { Author } from "./Author/Author";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CARD_DATA } from "../../constants/cardData";

// TODO: Повыносить все что можно за пределы функции и файла
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

export default function Blog() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Новости
        </Typography>
      </div>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={CARD_DATA[0].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {CARD_DATA[0].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {CARD_DATA[0].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {CARD_DATA[0].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={CARD_DATA[0].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={CARD_DATA[1].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {CARD_DATA[1].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {CARD_DATA[1].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {CARD_DATA[1].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={CARD_DATA[1].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={CARD_DATA[2].img}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {CARD_DATA[2].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {CARD_DATA[2].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {CARD_DATA[2].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={CARD_DATA[2].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {CARD_DATA[3].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {CARD_DATA[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {CARD_DATA[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={CARD_DATA[3].authors} />
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {CARD_DATA[4].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {CARD_DATA[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {CARD_DATA[4].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={CARD_DATA[4].authors} />
            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={CARD_DATA[5].img}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {CARD_DATA[5].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {CARD_DATA[5].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {CARD_DATA[5].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={CARD_DATA[5].authors} />
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
