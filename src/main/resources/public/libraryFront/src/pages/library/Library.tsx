import { Box } from "@mui/material";
import { TopBar } from "../../components/bar/topBar/TopBar";
import libraryPageStyle from "./library.module.css";
import { useState } from "react";
import { SideBar } from "../../components/bar/sideBar/SideBar";
import { Items } from "../../components/items/Items";
import { Objects, Object, Bar } from "../../globalTypes/globalTypes";
import { Details } from "../../components/details/Details";
import {
  addAuthorAxios,
  addReadiedBookAxios,
  addUserAxios,
  addWrittenBookAxios,
  getAllAuthorsAxios,
  getAllBookReadersAxios,
  getAllBooksAxios,
  getAllReadiedBooksAxios,
  getAllUsersaAxios as getAllUsersAxios,
  getAllWrittenBooksAxios,
  removeAuthorAxios,
  removeBookFromLibraryAxios,
  removeReadiedBookAxios,
  removeUserAxios,
  removeWrittenBookAxios,
  renameAuthorAxios,
  renameBookAxios,
  renameUserAxios,
} from "../../serverRequest/request";

const Library = () => {
  const [objectId, setObjectId] = useState("");
  const [objectName, setObjectName] = useState("");
  const [objects, setObjects] = useState<Objects>([]);
  const [objectInfo, setObjectInfo] = useState<Objects>([]);
  const [selectedBar, setSelectedBar] = useState<Bar>("none");

  const handleBar = (bar: Bar) => {
    setObjectInfo([]);
    setObjectId("");
    setObjectName("");
    setObjects([]);

    switch (bar) {
      case "books": {
        getAllBooksAxios().then((res) => setObjects(res));
        setSelectedBar("books");
        break;
      }
      case "users": {
        getAllUsersAxios().then((res) => setObjects(res));
        setSelectedBar("users");
        break;
      }
      case "authors": {
        getAllAuthorsAxios().then((res) => setObjects(res));
        setSelectedBar("authors");
        break;
      }
      default: {
        break;
      }
    }
  };

  const addObject = async (name: string, bar: Bar) => {
    switch (bar) {
      case "books": {
        await addWrittenBookAxios(objectId, name);
        getAllWrittenBooksAxios(objectId).then((res) => setObjectInfo(res));
        // getAllUsersAxios().then((res) => setObjects(res));
        break;
      }
      case "users": {
        await addUserAxios(name);
        getAllUsersAxios().then((res) => setObjects(res));
        break;
      }
      case "authors": {
        await addAuthorAxios(name);
        getAllAuthorsAxios().then((res) => setObjects(res));
        break;
      }
      default: {
        break;
      }
    }
  };

  const removeObject = async (id: string, bar: Bar) => {
    switch (bar) {
      case "books": {
        await removeBookFromLibraryAxios(id);
        setObjects([]);
        getAllBooksAxios().then((res) => setObjects(res));
        break;
      }
      case "users": {
        await removeUserAxios(id);
        setObjects([]);
        getAllUsersAxios().then((res) => setObjects(res));
        break;
      }
      case "authors": {
        await removeAuthorAxios(id);
        setObjects([]);
        getAllAuthorsAxios().then((res) => setObjects(res));
        break;
      }
      default: {
        break;
      }
    }
  };

  const renameObject = async (id: string, bar: Bar, newName: string) => {
    switch (bar) {
      case "books": {
        await renameBookAxios(id, newName);
        getAllBooksAxios().then((res) => setObjects(res));
        break;
      }
      case "users": {
        await renameUserAxios(id, newName);
        getAllUsersAxios().then((res) => setObjects(res));
        break;
      }
      case "authors": {
        await renameAuthorAxios(id, newName);
        getAllAuthorsAxios().then((res) => setObjects(res));
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleObjectInfo = (bar: Bar, id: string) => {
    const obj = objects.find((obj) => obj.id === id)?.name;
    obj != undefined ? setObjectName(obj) : null;
    setObjectId(id);

    switch (bar) {
      case "users": {
        getAllReadiedBooksAxios(id).then((res) => setObjectInfo(res));
        break;
      }
      case "books": {
        getAllBookReadersAxios(id).then((res) => setObjectInfo(res));
        break;
      }
      case "authors": {
        getAllWrittenBooksAxios(id).then((res) => setObjectInfo(res));
        break;
      }
      default: {
        break;
      }
    }
  };
  const addReadiedBook = async (userId: string, bookId: string) => {
    await addReadiedBookAxios(userId, bookId);
    getAllReadiedBooksAxios(objectId).then((res) => setObjectInfo(res));
  };
  const removeObjectInfo = async (objectInfoId: string, bar: Bar) => {
    switch (bar) {
      case "users": {
        await removeReadiedBookAxios(objectId, objectInfoId);
        getAllReadiedBooksAxios(objectId).then((res) => setObjectInfo(res));
        break;
      }
      case "authors": {
        await removeWrittenBookAxios(objectId,objectInfoId);
        getAllWrittenBooksAxios(objectId).then((res) => setObjectInfo(res));
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Box className={libraryPageStyle.libraryPageBox}>
      <SideBar onClicked={handleBar}></SideBar>
      <Box className={libraryPageStyle.topBarAndContantBox}>
        <TopBar />
        <Box className={libraryPageStyle.libraryContentBox}>
          <Items
            objects={objects}
            handleObjectInfo={handleObjectInfo}
            bar={selectedBar}
            addObject={addObject}
            removeObject={removeObject}
            renameObject={renameObject}
          ></Items>
          <Details
            objectId={objectId}
            objectName={objectName}
            addObject={addObject}
            bar={selectedBar}
            objectInfo={objectInfo}
            addReadiedBook={addReadiedBook}
            removeObject={removeObjectInfo}
          ></Details>
        </Box>
      </Box>{" "}
    </Box>
  );
};
export default Library;
