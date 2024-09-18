import {
  Control,
  Controller,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import Box from "@mui/material/Box/Box";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { List } from "../../List/List";
import { useEffect, useState } from "react";

export function DragAndDropSortableListField({
  control,
  setValue,
  options,
  label,
  labelId,
  name,
}: {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
  options: any;
  label: string;
  labelId: string;
  name: string;
}) {
  const [cards, setCards] = useState(options);

  useEffect(() => {
    setValue(name, cards);
  }, [cards, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <FormLabel id={labelId}>{label}</FormLabel>
          <List cards={cards} onCardsChange={setCards} />
        </Box>
      )}
    />
  );
}
