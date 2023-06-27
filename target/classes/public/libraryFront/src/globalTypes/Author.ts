import {  Book } from "./Book";
import { Entity } from "./Entity";

export interface  Author extends Entity {
    writtenBooks:  Book[];
  }