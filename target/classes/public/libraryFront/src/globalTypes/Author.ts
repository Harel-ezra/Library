import { Book } from "./Book";
import { SimpleObject } from "./SimpleObject";

export interface Author extends SimpleObject {
    writtenBooks: Book[];
  }