// // BaseEntity
// export interface SimpleObject{
//   id: string;
//   name: string;
// } 

// export interface User extends SimpleObject {
//   booksRead: Book[];
//   favoriteBookId: string;
// }

// export interface Author extends SimpleObject {
//   writtenBooks: Book[];
// }

// // readers
// export interface Book extends SimpleObject {
//   authorId: string;
// }

// בתכלס לא צריך את הטייפ הזה כי יש לך למעלה ואתה יכול להשתמש רק בעליון
// ולקרוא לו entity

// Entity
// export type Object=Book | User | Author;
// בזבוז
// export type Objects = Object[];

// EntityType
// אל תכלול undefined כי זה לא Entity
// אם יש מקום שהוא צריך להיות לא מוגדר אז תעשה 
// Bar | undefined
// שזה לא יהיה ברבים
export type EntityType = "Book" | "User" | "Author";
