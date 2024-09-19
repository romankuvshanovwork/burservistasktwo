import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragAndDropSortableListContainer } from "../DragAndDropSortableListContainer/DragAndDropSortableListContainer";

type CardData = { id: number; text: string };

export function DragAndDropSortableListList({
  cards,
  onCardsChange,
}: {
  cards: CardData[];
  onCardsChange: Function;
}) {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <DragAndDropSortableListContainer
          cards={cards}
          onCardsChange={onCardsChange}
        />
      </DndProvider>
    </div>
  );
}
