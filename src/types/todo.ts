export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type ViewMode = 'all' | 'active' | 'completed';