import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { List } from './List';
import { Board as BoardType, Card as CardType } from '../types';

interface Props {
  board: BoardType;
  onDragEnd: (result: DropResult) => void;
  onAddCard: (listId: string) => void;
  onEditCard: (card: CardType) => void;
  onDeleteCard: (cardId: string) => void;
}

export const Board = ({ board, onDragEnd, onAddCard, onEditCard, onDeleteCard }: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto min-h-screen">
        {board.lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onAddCard={onAddCard}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
