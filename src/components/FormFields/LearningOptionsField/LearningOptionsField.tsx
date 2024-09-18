import { Control, UseFormSetValue, FieldValues } from "react-hook-form";
import { DragAndDropSortableListField } from "../../CustomReusableFormFields/DragAndDropSortableListField/DragAndDropSortableListField";
import { LEARNING_OPTIONS } from "../../../constants/learningOptions";

export function LearningOptionsField({
  // TODO: Спросить как здесь улучшить?
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
      options={LEARNING_OPTIONS}
      label={
        "Распределите по порядку, что для вас интереснее изучать или узнавать:"
      }
      name="learningOptionsActivities"
      labelId="learning-options-activities-group-label"
    />
  );
}
