import Avatar from "@mui/material/Avatar/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup/AvatarGroup";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export function BlogAuthor({
  authors,
}: {
  authors: { name: string; avatar: string }[];
}) {
  // ВОПРОС: Как организовывать структуру папок? На этом примере:
  // оставить папку BlogAuthor с файлом компонента BlogAuthor.tsx в папке Blog
  // или в общей папке со всеми компоннтами - Components. Или это зависит от того
  // собираюсь ли я переиспользовать этот компонент где-нибудь в другом месте?
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}
