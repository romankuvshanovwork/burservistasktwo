import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { CARD_DATA } from "../../constants/cardData";
import { BlogHeadline } from "./BlogHeadline/BlogHeadline";
import { BlogCard } from "./BlogCard/BlogCard";

export default function Blog() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <BlogHeadline headline="Новости" />
      <Grid container spacing={2} columns={12}>
        {CARD_DATA.map((cardData, index) => {
          return (
            <Grid size={{ xs: 12, md: index < 2 ? 6 : 4 }}>
              <BlogCard cardData={cardData} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
