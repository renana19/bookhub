export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export interface Rating {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
}
