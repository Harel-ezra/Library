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

export type Object=Book | User | Author;
export type Objects = Object[];

export type Bar = "books" | "users" | "authors" | "none";

// export interface ItemsList {
//   items: Book[] | User[] | Author[];
// }
