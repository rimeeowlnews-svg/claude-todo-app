import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">간단하고 깔끔한 할 일 관리</p>
        </header>
        
        <TodoList />
      </div>
    </div>
  );
}
