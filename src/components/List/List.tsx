import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../Container/Container";

type CardData = { id: number; text: string };

export function List({
  cards,
  onCardsChange,
}: {
  cards: CardData[];
  onCardsChange: Function;
}) {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container cards={cards} onCardsChange={onCardsChange} />
      </DndProvider>
    </div>
  );
}
