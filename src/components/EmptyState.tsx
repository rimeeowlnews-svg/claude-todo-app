'use client';

import { ViewMode } from '@/types/todo';

interface EmptyStateProps {
  view: ViewMode;
}

export default function EmptyState({ view }: EmptyStateProps) {
  const messages = {
    all: {
      title: '아직 할 일이 없습니다',
      description: '새로운 할 일을 추가해보세요!'
    },
    active: {
      title: '진행 중인 할 일이 없습니다',
      description: '새로운 할 일을 추가하거나 완료된 할 일을 확인해보세요.'
    },
    completed: {
      title: '완료된 할 일이 없습니다',
      description: '할 일을 완료하면 여기에 표시됩니다.'
    }
  };

  const message = messages[view];

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {message.title}
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        {message.description}
      </p>
    </div>
  );
}