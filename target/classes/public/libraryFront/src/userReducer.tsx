interface setUserAction {
  type: "SET_USER";
  payload:
    | {
        id: string;
        name: string;
        favoriteBookId: string;
        favoriteBookName: string;
      }
    | undefined;
}
interface setUserNameAction {
  type: "SET_USER_NAME";
  payload: { name: string } | undefined;
}
interface setFavoriteBookAction {
  type: "SET_FAVORITE_BOOK";
  payload: { id: string; name: string } | undefined;
}

const initialState = {
  user: undefined as
    | {
        id: string;
        name: string;
        favoriteBookId: string;
        favoriteBookName: string;
      }
    | undefined,
};

const userReducer = (
  state = initialState,
  action: setUserAction | setUserNameAction | setFavoriteBookAction
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload?.name,
        },
      };
    case "SET_FAVORITE_BOOK":
      return {
        ...state,
        user: {
          ...state.user,
          favoriteBookId: action.payload?.id,
          favoriteBookName: action.payload?.name,
        },
      };

    default:
      return state;
  }
};
export default userReducer;
