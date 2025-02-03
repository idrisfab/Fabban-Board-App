import { useState } from 'react';
import { Board } from './components/Board';
import { EditModal } from './components/EditModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Board as BoardType, Card as CardType } from './types';
import { DropResult } from 'react-beautiful-dnd';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const initialBoard: BoardType = {
  lists: [
    {
      id: 'todo',
      title: 'To Do',
      cards: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: []
    },
    {
      id: 'done',
      title: 'Done',
      cards: []
    }
  ]
};

export default function App() {
  const [board, setBoard] = useLocalStorage<BoardType>('kanban-board', initialBoard);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [editingCard, setEditingCard] = useState<CardType | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    setBoard((prev) => {
      const newBoard = { ...prev };
      const sourceList = newBoard.lists.find((l) => l.id === source.droppableId);
      const destList = newBoard.lists.find((l) => l.id === destination.droppableId);
      
      if (!sourceList || !destList) return prev;

      const [movedCard] = sourceList.cards.splice(source.index, 1);
      destList.cards.splice(destination.index, 0, movedCard);

      return newBoard;
    });
  };

  const handleAddCard = (listId: string) => {
    const newCard: CardType = {
      id: crypto.randomUUID(),
      title: 'New Card',
      weight: 0,
      description: '',
      labels: [],
      createdAt: new Date().toISOString()
    };

    setBoard((prev) => {
      const list = prev.lists.find((l) => l.id === listId);
      if (!list) return prev;

      return {
        ...prev,
        lists: prev.lists.map((l) =>
          l.id === listId
            ? { ...l, cards: [...l.cards, newCard] }
            : l
        )
      };
    });
  };

  const handleEditCard = (card: CardType) => {
    setEditingCard(card);
  };

  const handleSaveCard = (updatedCard: CardType) => {
    setBoard((prev) => {
      return {
        ...prev,
        lists: prev.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          )
        }))
      };
    });
  };

  const handleDeleteCard = (cardId: string) => {
    setBoard((prev) => {
      const newBoard = { ...prev };
      newBoard.lists = newBoard.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card.id !== cardId)
      }));
      return newBoard;
    });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kanban Board
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </header>
        <main>
          <Board
            board={board}
            onDragEnd={handleDragEnd}
            onAddCard={handleAddCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
          />
          <EditModal
            card={editingCard}
            onClose={() => setEditingCard(null)}
            onSave={handleSaveCard}
          />
        </main>
      </div>
    </div>
  );
}
