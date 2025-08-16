'use client';

import { ViewMode } from '@/types/todo';

interface ViewTabsProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function ViewTabs({ currentView, onViewChange, counts }: ViewTabsProps) {
  const tabs = [
    { key: 'active' as ViewMode, label: '진행 중', count: counts.active },
    { key: 'completed' as ViewMode, label: '완료됨', count: counts.completed },
    { key: 'all' as ViewMode, label: '전체', count: counts.all },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onViewChange(tab.key)}
          className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors ${
            currentView === tab.key
              ? 'border-gray-500 text-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
          <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}