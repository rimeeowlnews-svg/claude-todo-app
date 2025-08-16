'use client';

import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo, Category, ViewMode } from '@/types/todo';
import CategoryManager from './CategoryManager';
import AddTodoForm from './AddTodoForm';
import ViewTabs from './ViewTabs';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

const DEFAULT_CATEGORY: Category = {
  id: 'default',
  name: '일반',
  color: 'bg-gray-100 text-gray-800',
};

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [DEFAULT_CATEGORY]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('default');
  const [currentView, setCurrentView] = useState<ViewMode>('active');

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      categoryId: selectedCategoryId,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryData,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (categoryId: string) => {
    if (categoryId === 'default') return;
    
    setTodos(prev =>
      prev.map(todo =>
        todo.categoryId === categoryId
          ? { ...todo, categoryId: 'default' }
          : todo
      )
    );
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId('default');
    }
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (selectedCategoryId !== 'all') {
      filtered = filtered.filter(todo => todo.categoryId === selectedCategoryId);
    }

    switch (currentView) {
      case 'active':
        return filtered.filter(todo => !todo.completed);
      case 'completed':
        return filtered.filter(todo => todo.completed);
      default:
        return filtered;
    }
  }, [todos, selectedCategoryId, currentView]);

  const counts = useMemo(() => {
    const categoryTodos = selectedCategoryId === 'all' 
      ? todos 
      : todos.filter(todo => todo.categoryId === selectedCategoryId);
    
    return {
      all: categoryTodos.length,
      active: categoryTodos.filter(todo => !todo.completed).length,
      completed: categoryTodos.filter(todo => todo.completed).length,
    };
  }, [todos, selectedCategoryId]);

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id) || DEFAULT_CATEGORY;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CategoryManager
        categories={[{ id: 'all', name: '전체', color: 'bg-gray-100 text-gray-800' }, ...categories]}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
        onCategoryAdd={addCategory}
        onCategoryDelete={deleteCategory}
      />

      <AddTodoForm onAdd={addTodo} />

      <ViewTabs
        currentView={currentView}
        onViewChange={setCurrentView}
        counts={counts}
      />

      {filteredTodos.length === 0 ? (
        <EmptyState view={currentView} />
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              category={getCategoryById(todo.categoryId)}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}