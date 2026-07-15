export interface Todo {
  _id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  priority: number;
  date: string; // because of json serialization
}