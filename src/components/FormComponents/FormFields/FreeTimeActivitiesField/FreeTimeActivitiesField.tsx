import { Control, UseFormSetValue, FieldValues } from "react-hook-form";
import { DragAndDropSortableListField } from "../../CustomReusableFormFields/DragAndDropSortableListField/DragAndDropSortableListField";
import { FREE_TIME_ACTIVITIES } from "../../../../constants/freeTimeActivities";

export function FreeTimeActivitiesField({
  control,
  setValue,
}: {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return (
    <DragAndDropSortableListField
      control={control}
      setValue={setValue}
      options={FREE_TIME_ACTIVITIES}
      label={"Распределите по порядку, что вам больше всего нравится делать в свободное время:"}
      name="freeTimeActivities"
      labelId="free-time-activities-group-label"
    />
  );
}
