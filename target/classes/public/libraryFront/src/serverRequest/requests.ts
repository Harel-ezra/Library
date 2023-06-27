import { EntityType } from "src/globalTypes/EntityType";
import axios from "axios";

const httpLocalHost = `http://localhost:4567/`;

export const addEntity = async (name: string, entity: EntityType) => {
  const response = await axios.post(`${httpLocalHost}add${entity}`, {
    name: name,
  });
  return response?.data;
};

export const renameEntity = async (
  id: string,
  newName: string,
  entity: EntityType
) => {
  const response = await axios.put(`${httpLocalHost}rename${entity}`, {
    id: id,
    newName: newName,
  });
  return response?.data;
};

export const removeEntity = async (id: string, entity: EntityType) => {
  const response = await axios.delete(`${httpLocalHost}remove${entity}`, {
    data: {
      id: id,
    },
  });
  return response?.data;
};

export const updateFavoriteBookAxios = async (
  userId: string,
  bookId: string
) => {
  const response = await axios.put(`${httpLocalHost}updateFavoriteBook`, {
    userId: userId,
    bookId: bookId,
  });
  return response?.data;
};

export const getFavoriteBook = async (userId: string) => {
  const response = await axios.get(
    `${httpLocalHost}getFavoriteBook?id=${userId}`
  );
  return await response.data;
};

export const getUser = async (userId: string) => {
  const response = await axios.get(`${httpLocalHost}getUser?id=${userId}`);
  return response.data;
};

export const addReadBook = async (userId: string, bookId: string) => {
  const response = await axios.put(`${httpLocalHost}addReadiedBook`, {
    userId: userId,
    bookId: bookId,
  });
  return response?.data;
};

export const addWrittenBook = async (authorId: string, bookName: string) => {
  const response = await axios.put(`${httpLocalHost}addWrittenBook`, {
    authorId: authorId,
    bookName: bookName,
  });
  return response?.data;
};

export const removeEntityBook = async (
  id: string,
  bookId: string,
  entityType: EntityType
) => {
  const response = await axios.put(`${httpLocalHost}remove${entityType} Book`, {
    id: id,
    bookId: bookId,
  });
  return response?.data;
};

export const getEntities = async (entityType: EntityType) => {
  const response = await axios.get(`${httpLocalHost}${entityType}`);
  return await response.data;
};

export const getEntityDetails = async (id: string, entityType: EntityType) => {
  const response = await axios.get(
    `${httpLocalHost}${entityType}Details?id=${id}`
  );
  return await response.data;
};
