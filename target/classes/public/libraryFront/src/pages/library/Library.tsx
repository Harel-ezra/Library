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
import { SimpleObject } from "src/globalTypes/SimpleObject";
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
  // היוזר איידי ישלף רק מהרידקס
  // ואת הבדיקה של האם אנחנו מחוברים נעשה ב
  // useEffect
  // ושיהיה לזה פונקציה
  // כל הלוגיקה של היוזר תכנס בפונקצית התחברות

  // זה גם יהיה חלק מפונקציית ההתחברות במקרה שאנחנו מרעננים
  // -----------------------------------------------------------
  const user = useSelector((store: StoreState) => store.user);
  // const [user, setUser] = useState(userRedux);
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    handleFavoriteBook(user!.id, dispatch);
  }, []);

  // localStorage.setItem("id", userId);
  // dispatch({ type: "SET_ID", payload: userId });
  // עד לכאן ^ מה שאמרתי למעלה
  // selectedEntityType
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType>();

  // Entities
  const [entities, setEntities] = useState<SimpleObject[]>([]);

  // selectedEntityDetails
  const [selectedEntityDetails, setSelectedEntityDetails] = useState<
    SimpleObject[]
  >([]);
  const [selectedEntity, setSelectedEntity] = useState<SimpleObject>();

  // selectedEntity
  // שיהיה undefined
  // בלי האובייקט המוזר

  // לא טוב אתה צריך לשמור את היוזר המלא ברידקס
  // אם השתנה שם היוזר שלנו אז נשנה רק את השם ברידקס
  // const [favoriteBookName, setFavoriteBookName] = useState("");
  // ותעיף את זה
  // const [userName, setUserName] = useState("");

  // handleSidebarSelect
  const handleSidebarSelect = (entityType: EntityType) => {
    setEntities([]);
    setSelectedEntity(undefined);
    setSelectedEntityDetails([]);

    // שים if
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
      // תנאי מיותר זה גם מתקשר לזה ש
      // Bar לא צריך להיות undefined
      await addEntity(name, entityType).then((res) => setEntities(res));
      // getEntities(entityType).then((res) => setEntities(res));
    }
  };

  // interface ServerResult {
  //   isSuccess: boolean,
  //   data: any
  // }

  const HandleRemoveEntity = async (id: string, entityType: EntityType) => {
    if (id === selectedEntity?.id) {
      setSelectedEntityDetails([]);
      setSelectedEntity(undefined);
    }
    // תנאי מיותר זה גם מתקשר לזה ש
    // Bar לא צריך להיות undefined
    // removeEntity(id, entityType).then((res) => setEntities(res));
    setEntities(await removeEntity(id, entityType));

    if (selectedEntityType === "Author") {
      handleFavoriteBook(user!.id, dispatch);
    }
    // תוסיף תנאים מתאימים
    // handleFavoriteBook(user!.id, dispatch);
  };

  const handleRenameEntity = async (
    id: string,
    entityType: EntityType,
    newName: string
  ) => {
    if (id === user!.id) {
      dispatch({ type: "SET_USER_NAME", payload: { name: newName } });
    }
    setEntities(await renameEntity(id, newName, entityType));

    if (id === user!.favoriteBookId) {
      handleFavoriteBook(user!.id, dispatch);
    }
  };

  // handleSelectEntity
  const handleSelectEntityDetails = (entityType: EntityType, id: string) => {
    // במקום סימן שאלה תשים סימן קריאה כי אתה יודע שזה בהכרח קיים
    setSelectedEntity({
      id: id,
      name: entities.find((obj) => obj.id === id)!.name,
    });
    getEntityDetails(id, entityType).then((res) =>
      setSelectedEntityDetails(res)
    );
    // ^ למה handle ולא get
    // ולמה המילה function
  };

  // addReadBook
  // readied זה לא מילה
  const handleAddReadBook = (userId: string, bookId: string) => {
    addReadBook(userId, bookId).then((res) => setSelectedEntityDetails(res));
  };

  const handleRemoveEntityDetail = async (
    objectInfoId: string,
    entityType: EntityType
  ) => {
    setSelectedEntityDetails(
      await removeEntityBook(selectedEntity!.id, objectInfoId, entityType)
    );
    if (objectInfoId === user!.favoriteBookId) {
      handleFavoriteBook(user!.id, dispatch);
    }
  };

  return (
    <Box className={libraryPageStyle.libraryPageBox}>
      <SideBar onClick={handleSidebarSelect}></SideBar>
      <Box className={libraryPageStyle.topBarAndContantBox}>
        {/* שלא יהיה בתוך התוכן עמוד */}
        {/* 
        אתה יכול לשים להם absolute 
        זה מקרה ספציפי שאפשר 
        */}
        <TopBar />
        <Box
          className={libraryPageStyle.libraryContentBox}
          bgcolor={"primary.main"}
        >
          {/* ItemsTable */}
          <ItemsTable
            entitys={entities}
            selectedEntityDetails={handleSelectEntityDetails}
            entityType={selectedEntityType}
            addEntity={handleAddEntity}
            removeEntity={HandleRemoveEntity}
            renameEntity={handleRenameEntity}
            selectedEntity={selectedEntity}
          ></ItemsTable>
          {/* DetailsTable */}
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
