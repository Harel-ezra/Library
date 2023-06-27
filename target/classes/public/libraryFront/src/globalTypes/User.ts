import { Book } from "./Book";
import { SimpleObject } from "./SimpleObject";

export interface User extends SimpleObject {
    booksRead: Book[];
    favoriteBookId: string;
  }