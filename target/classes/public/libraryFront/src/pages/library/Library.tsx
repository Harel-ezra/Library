import { Box } from "@mui/material";
import { TopBar } from "../../components/bar/topBar/TopBar";
import libraryPageStyle from "./library.module.css";
import { Details } from "@mui/icons-material";
import { useState } from "react";
import { SideBar } from "../../components/bar/sideBar/SideBar";
import { Items } from "../../components/items/Items";
import { User, Book, Author, ItemsList } from "../../globalTypes/globalTypes";
import { useGetAll } from "../../hooks/hooks";

export type barClicked = "books" | "users" | "authors";

const Library = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [items, setItems] = useState<ItemsList>([]);
  useGetAll({ setUsers, setAuthors, setBooks });

  const handleItems = (bar: barClicked) => {
    switch (bar) {
      case "books": {
        setItems(books);
        break;
      }
      case "users": {
        setItems(users);
        break;
      }
      case "authors": {
        setItems(authors);
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <Box className={libraryPageStyle.libraryPageBox}>
      <SideBar onClicked={handleItems}></SideBar>
      <Box className={libraryPageStyle.topBarAndContantBox}>
        <TopBar />
        <Box className={libraryPageStyle.libraryContentBox}>
          <Items itemsList={items}></Items>
          <Details></Details>
        </Box>
      </Box>{" "}
    </Box>
  );
};
export default Library;
