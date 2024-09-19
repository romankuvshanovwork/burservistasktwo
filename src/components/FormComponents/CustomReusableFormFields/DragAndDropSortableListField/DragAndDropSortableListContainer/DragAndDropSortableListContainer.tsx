import update from "immutability-helper";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { useDrop } from "react-dnd";

import { DragAndDropSortableListCard } from "../DragAndDropSortableListCard/DragAndDropSortableListCard";
import { ItemTypes } from "../../../../../constants/ItemTypes";

const style = {
  width: "auto",
};

export interface ContainerState {
  cards: any[];
}

type Props = { cards: CardData[]; onCardsChange: Function };
type CardData = { id: number; text: string };

export const DragAndDropSortableListContainer: FC<Props> = memo(
  function Container({
    cards,
    onCardsChange,
  }: {
    cards: CardData[];
    onCardsChange: Function;
  }) {
    const findCard = useCallback(
      (id: string) => {
        const card = cards.filter((c) => `${c.id}` === id)[0] as {
          id: number;
          text: string;
        };
        return {
          card,
          index: cards.indexOf(card),
        };
      },
      [cards]
    );

    const moveCard = useCallback(
      (id: string, atIndex: number) => {
        const { card, index } = findCard(id);
        onCardsChange(
          update(cards, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          })
        );
      },
      [findCard, cards, onCardsChange]
    );

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
    return (
      <div ref={drop} style={style}>
        {cards.map((card) => (
          <DragAndDropSortableListCard
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </div>
    );
  }
);
