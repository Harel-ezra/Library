import { useEffect } from "react";
import { getAllUsersaAxios,getAllAuthorsAxios,getAllBooksAxios } from "../serverRequest/request";
import { Author, Book, User } from "../globalTypes/globalTypes";

interface  Props{
  setUsers:React.Dispatch<React.SetStateAction<User[]>>,
  setBooks:React.Dispatch<React.SetStateAction<Book[]>>,
  setAuthors:React.Dispatch<React.SetStateAction<Author[]>>,
}

// type Set=React.Dispatch<React.SetStateAction<User[]>>;
export const useGetAll = (set:Props) => {
  useEffect(() => {
    getAllUsersaAxios().then((res) => set.setUsers(res));
  }, []);
  useEffect(() => {
    getAllAuthorsAxios().then((res) => set.setAuthors(res));
  }, []);
  useEffect(() => {
    getAllBooksAxios().then((res) => set.setBooks(res));
  }, []);
};
