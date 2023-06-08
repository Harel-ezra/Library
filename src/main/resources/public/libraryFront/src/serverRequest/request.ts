import axios from "axios";

const httpLocalHost = `http://localhost:4567/`;

// export const addBookToLibraryAxios = async (
//   bookName: string,
//   authorId: string
// ) => {
//   const response = await axios.post(`${httpLocalHost}addBookToLibrary`, {
//     bookName: bookName,
//     authorId: authorId,
//   });
//   return response?.status;
// };

export const removeBookFromLibraryAxios = async (
  bookId: string,
) => {
  const response = await axios.delete(`${httpLocalHost}removeBookFromLibrary`, {
    data: {
      bookId: bookId,
    },
  });
  return response?.status;
};

export const renameBookAxios = async (bookId: string, newName: string) => {
  const response = await axios.put(`${httpLocalHost}renameBook`, {
    bookId: bookId,
    newName: newName,
  });
  return response?.status;
};

export const addUserAxios = async (userName: string) => {
  const response = await axios.post(`${httpLocalHost}addUser`, {
    userName: userName,
  });
  return response?.status;
};

export const removeUserAxios = async (userId: string) => {
  const response = await axios.delete(`${httpLocalHost}removeUser`, {
    data: {
      userId: userId,
    },
  });
  return response?.status;
};

export const renameUserAxios = async (userId: string, newName: string) => {
  const response = await axios.put(`${httpLocalHost}renameUser`, {
    userId: userId,
    newName: newName,
  });
  return response?.status;
};

export const updateFavoriteBookAxios = async (
  userId: string,
  bookId: string
) => {
  const response = await axios.put(`${httpLocalHost}updateFavoriteBook`, {
    userId: userId,
    bookId: bookId,
  });
  return response?.status;
};

export const addReadiedBookAxios = async (userId: string, bookId: string) => {
  const response = await axios.put(`${httpLocalHost}addReadiedBook`, {
    userId: userId,
    bookId: bookId,
  });
  return response?.status;
};

export const removeReadiedBookAxios = async (
  userId: string,
  bookId: string
) => {
  const response = await axios.put(`${httpLocalHost}removeReadiedBook`, {
    userId: userId,
    bookId: bookId,
  });
  return response?.status;
};

export const addAuthorAxios = async (name: string) => {
  const response = await axios.post(`${httpLocalHost}addAuthor`, {
    authorName: name,
  });
  return response?.status;
};

export const removeAuthorAxios = async (authorId: string) => {
  const response = await axios.delete(`${httpLocalHost}removeAuthor`, {
    data: {
      authorId: authorId,
    },
  });
  return response?.status;
};

export const renameAuthorAxios = async (authorId: string, newName: string) => {
  const response = await axios.put(`${httpLocalHost}renameAuthor`, {
    authorId: authorId,
    newName: newName,
  });
  return response?.status;
};

export const addWrittenBookAxios = async (authorId: string, bookName: string) => {
  const response = await axios.put(`${httpLocalHost}addWrittenBook`, {
    authorId: authorId,
    bookName: bookName,
  });
  return response?.status;
};
export const removeWrittenBookAxios = async (
  authorId: string,
  bookId: string
) => {
  const response = await axios.put(`${httpLocalHost}removeWrittenBook`, {
    authorId: authorId,
    bookId: bookId,
  });
  return response?.status;
};

export const getAllUsersaAxios = async () => {
  const response = await axios.get(`${httpLocalHost}allUsers`);
  return await response.data;
};

export const getAllAuthorsAxios = async () => {
  const response = await axios.get(`${httpLocalHost}allAuthors`);
  return await response.data;
};

export const getAllBooksAxios = async () => {
  const response = await axios.get(`${httpLocalHost}allBooks`);
  return await response.data;
};

export const getAllWrittenBooksAxios = async (authorId: string) => {
  const response = await axios.get(
    `${httpLocalHost}getAllWrittenBooks?id=${authorId}`
  );
  return await response.data;
};
export const getAllReadiedBooksAxios = async (userId: string) => {
  const response = await axios.get(
    `${httpLocalHost}getAllReadiedBooks?id=${userId}`
  );
  return await response.data;
};
export const getAllBookReadersAxios = async (bookId: string) => {
  const response = await axios.get(
    `${httpLocalHost}getAllBookReaders?id=${bookId}`
  );
  return await response.data;
};

