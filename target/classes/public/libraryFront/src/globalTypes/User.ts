import {  Book } from "./Book";
import { Entity } from "./Entity";

export interface  User extends Entity {
    booksRead:  Book[];
    favoriteBookId: string;
  }