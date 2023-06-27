import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import libraryPageStyle from "./library.module.css";
import { TopBar } from "components/bar/topBar/TopBar";
import { SideBar } from "components/bar/sideBar/SideBar";
import { ItemsTable } from "src/components/items/ItemsTable";
import { DetailsTable } from "src/components/details/DetailsTable";
import { EntityType } from "src/globalTypes/EntityType";
import { Entity } from "src/globalTypes/Entity";
import {
  addEntity,
  addReadBook,
  addWrittenBook,
  getEntities,
  getEntityDetails,
  getFavoriteBook,
  removeEntity,
  removeEntityBook,
  renameEntity,
} from "src/serverRequest/requests";
import { StoreState } from "src/store";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: StoreState) => store.user);
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    handleFavoriteBook(user.id, dispatch);
  }, []);

  const [selectedEntityType, setSelectedEntityType] = useState<EntityType>();

  const [entities, setEntities] = useState<Entity[]>([]);

  const [selectedEntityDetails, setSelectedEntityDetails] = useState<Entity[]>(
    []
  );
  const [selectedEntity, setSelectedEntity] = useState<Entity>();

  const handleSidebarSelect = (entityType: EntityType) => {
    setEntities([]);
    setSelectedEntity(undefined);
    setSelectedEntityDetails([]);

    if (entityType) getEntities(entityType).then((res) => setEntities(res));
    setSelectedEntityType(entityType);
  };

  const handleAddEntity = async (name: string, entityType: EntityType) => {
    if (entityType === "Book") {
      await addWrittenBook(selectedEntity!.id, name);
      getEntityDetails(selectedEntity!.id, "Author").then((res) =>
        setSelectedEntityDetails(res)
      );
    } else {
      await addEntity(name, entityType).then((res) => setEntities(res));
    }
  };

  const HandleRemoveEntity = async (id: string, entityType: EntityType) => {
    if (id === selectedEntity?.id) {
      setSelectedEntityDetails([]);
      setSelectedEntity(undefined);
    }
    setEntities(await removeEntity(id, entityType));

    if (selectedEntityType === "Author") {
      handleFavoriteBook(user.id, dispatch);
    }
  };

  const handleRenameEntity = async (
    id: string,
    entityType: EntityType,
    newName: string
  ) => {
    if (id === user.id) {
      dispatch({ type: "SET_USER_NAME", payload: { name: newName } });
    }
    // כאן עדיף שנקבל שם ומזהה של היישות שהשתנתה ואז למצוא אצלנו ולשנות
    // לא תמיד עדיף שליפה
    setEntities(await renameEntity(id, newName, entityType));

    if (id === user.favoriteBookId) {
      handleFavoriteBook(user.id, dispatch);
    }
  };

  const handleSelectEntity = (entityType: EntityType, id: string) => {
    setSelectedEntity({
      id: id,
      name: entities.find((obj) => obj.id === id)!.name,
    });
    getEntityDetails(id, entityType).then((res) =>
      setSelectedEntityDetails(res)
    );
  };

  // אפשר גם addBookToUser
  const handleAddReadBook = (userId: string, bookId: string) => {
    addReadBook(userId, bookId).then((res) => setSelectedEntityDetails(res));
  };

  const handleRemoveEntityDetail = async (
    entityId: string,
    entityType: EntityType
  ) => {
    setSelectedEntityDetails(
      await removeEntityBook(selectedEntity!.id, entityId, entityType)
    );
    if (entityId === user.favoriteBookId) {
      dispatch({
        type: "SET_FAVORITE_BOOK",
        payload: { id: "0", name: "לא נבחר ספר" },
      });
    }
  };

  return (
    <Box className={libraryPageStyle.libraryPage}>
      <SideBar onClick={handleSidebarSelect}></SideBar>
      <Box className={libraryPageStyle.topBarAndContantBox}>
        <TopBar />
        <Box
          className={libraryPageStyle.libraryContentBox}
          bgcolor={"primary.main"}
        >
          <ItemsTable
            entitys={entities}
            selectedEntityDetails={handleSelectEntity}
            entityType={selectedEntityType}
            addEntity={handleAddEntity}
            removeEntity={HandleRemoveEntity}
            renameEntity={handleRenameEntity}
            selectedEntity={selectedEntity}
          ></ItemsTable>
          <DetailsTable
            selectedEntity={selectedEntity!}
            addEntityDetail={handleAddEntity}
            entityType={selectedEntityType}
            entityDetails={selectedEntityDetails}
            addReadiedBook={handleAddReadBook}
            removeEntityDetail={handleRemoveEntityDetail}
          ></DetailsTable>
        </Box>
      </Box>
    </Box>
  );
};
export default Library;

export const handleFavoriteBook = (id: string, dispatch: Dispatch<any>) => {
  getFavoriteBook(id).then((res) => {
    if (res) {
      dispatch({
        type: "SET_FAVORITE_BOOK",
        payload: { id: res.id, name: res.name },
      });
    } else {
      dispatch({
        type: "SET_FAVORITE_BOOK",
        payload: { id: "0", name: "לא נבחר ספר" },
      });
    }
  });
};
