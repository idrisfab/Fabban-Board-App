import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { List as ListType, Card as CardType } from '../types';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Props {
  list: ListType;
  onAddCard: (listId: string) => void;
  onEditCard: (card: CardType) => void;
  onDeleteCard: (cardId: string) => void;
}

export const List = memo(({ list, onAddCard, onEditCard, onDeleteCard }: Props) => {
  return (
    <div className="flex flex-col w-80 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {list.title}
        </h2>
        <button
          onClick={() => onAddCard(list.id)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[100px] ${
              snapshot.isDraggingOver ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            {list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={onDeleteCard}
                onEdit={onEditCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});
