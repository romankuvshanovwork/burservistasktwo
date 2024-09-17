import {
  Control,
  Controller,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import Box from "@mui/material/Box/Box";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { List } from "../List/List";
import { useEffect, useState } from "react";

export function FreeTimeActivitiesField({
  control,
  setValue,
  options,
  label,
}: {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
  options: any;
  label: string;
}) {
  const [cards, setCards] = useState(options);

  useEffect(() => {
    setValue("freeTimeActivities", cards);
  }, [cards, setValue]);

  return (
    <Controller
      name="freeTimeActivities"
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
          <FormLabel id="free-time-activities-group-label">
            {label}
          </FormLabel>
          <List cards={cards} onCardsChange={setCards} />
        </Box>
      )}
    />
  );
}
