export interface Card {
  id: string;
  title: string;
  weight: number;
  description?: string;
  dueDate?: string;
  labels: string[];
  createdAt: string;
}
