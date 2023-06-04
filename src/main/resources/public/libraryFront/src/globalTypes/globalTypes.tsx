export interface User {
  id: string;
  name: string;
  booksRead: Book[];
  favoriteBookId: string;
}
export interface Author {
  id: string;
  name: string;
  writtenBooks: Book[];
}
export interface Book {
  id: string;
  name: string;
  authorId: string;
}

export type ItemsList = Book[] | User[] | Author[];

// export interface ItemsList {
//   items: Book[] | User[] | Author[];
// }
