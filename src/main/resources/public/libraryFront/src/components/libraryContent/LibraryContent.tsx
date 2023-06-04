// import { Box } from "@mui/material";
// import { SideBar } from "../bar/sideBar/SideBar";
// import { Items } from "../items/Items";
// import { Details } from "../details/Details";

// import libraryContentStyle from "./libraryContent.module.css";
// import { useState } from "react";
// import { User, Book, Author, ItemsList } from "../../globalTypes/globalTypes";
// import { useGetAll } from "../../hooks/hooks";

// export type barClicked = "books" | "users" | "authors";

// export const LibraryContent = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [authors, setAuthors] = useState<Author[]>([]);

//   const [items, setItems] = useState<ItemsList>([]);
//   useGetAll({setUsers,setAuthors,setBooks});

//   const handleItems = (bar: barClicked) => {
//     switch (bar) {
//       case "books": {
//         setItems(books);
//         break;
//       }
//       case "users": {
//         setItems(users);
//         break;
//       }
//       case "authors": {
//         setItems(authors);
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   };

//   return (
//     <Box className={libraryContentStyle.libraryContentBox}>
//       <SideBar onClicked={handleItems}></SideBar>
//       <Items itemsList={items}></Items>
//       <Details></Details>
//     </Box>
//   );
// };
