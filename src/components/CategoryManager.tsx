'use client';

import { useState } from 'react';
import { Category } from '@/types/todo';

interface CategoryManagerProps {
  categories: Category[];
  selectedCategoryId: string;
  onCategorySelect: (categoryId: string) => void;
  onCategoryAdd: (category: Omit<Category, 'id'>) => void;
  onCategoryDelete: (categoryId: string) => void;
}

const CATEGORY_COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-yellow-100 text-yellow-800',
  'bg-indigo-100 text-indigo-800',
];

export default function CategoryManager({
  categories,
  selectedCategoryId,
  onCategorySelect,
  onCategoryAdd,
  onCategoryDelete,
}: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const colorIndex = categories.length % CATEGORY_COLORS.length;
      onCategoryAdd({
        name: newCategoryName.trim(),
        color: CATEGORY_COLORS[colorIndex],
      });
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewCategoryName('');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <button
              onClick={() => onCategorySelect(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategoryId === category.id
                  ? category.color + ' ring-2 ring-gray-400'
                  : category.color + ' hover:opacity-80'
              }`}
            >
              {category.name}
            </button>
            {category.name !== '일반' && (
              <button
                onClick={() => onCategoryDelete(category.id)}
                className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                title="카테고리 삭제"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        {isAdding ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                if (!newCategoryName.trim()) {
                  setIsAdding(false);
                }
              }}
              placeholder="카테고리 이름"
              className="px-2 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddCategory}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              ✓
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="px-3 py-1 text-sm text-gray-500 border border-dashed border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + 카테고리 추가
          </button>
        )}
      </div>
    </div>
  );
}