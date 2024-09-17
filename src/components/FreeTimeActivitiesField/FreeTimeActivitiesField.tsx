import {
  Control,
  Controller,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import Box from "@mui/material/Box/Box";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { List } from "../List/List";
import { FREE_TIME_ACTIVITIES } from "../../constants/freeTimeActivities";
import { useEffect, useState } from "react";

export function FreeTimeActivitiesField({
  control,
  setValue,
}: {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [cards, setCards] = useState(FREE_TIME_ACTIVITIES);

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
            Распределите по порядку, что вам больше всего нравится делать в
            свободное время:
          </FormLabel>
          <List cards={cards} onCardsChange={setCards} />
        </Box>
      )}
    />
  );
}
