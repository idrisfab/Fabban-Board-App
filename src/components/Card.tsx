import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../types';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon, ScaleIcon } from '@heroicons/react/24/outline';

interface Props {
  card: CardType;
  index: number;
  onDelete: (cardId: string) => void;
  onEdit: (card: CardType) => void;
}

export const Card = memo(({ card, index, onDelete, onEdit }: Props) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 rounded-lg shadow-sm ${
            snapshot.isDragging
              ? 'bg-gray-100 dark:bg-gray-700 shadow-lg'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {card.title}
              </h3>
              <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                <ScaleIcon className="h-4 w-4 mr-1" />
                <span>Weight: {card.weight}</span>
              </div>
            </div>
            <div className="flex space-x-2 ml-2">
              <button
                onClick={() => onEdit(card)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(card.id)}
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          {card.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {card.description}
            </p>
          )}
          {card.dueDate && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Due: {format(new Date(card.dueDate), 'MMM d, yyyy')}
            </div>
          )}
          {card.labels.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {card.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
});
