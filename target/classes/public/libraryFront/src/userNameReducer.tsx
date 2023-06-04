
interface setIdAction {
  type: 'SET_ID';
  payload: string | null;
}

interface setNameAction {
  type: 'SET_NAME';
  payload: string | null;
}

const initialState = {
  id: null as string | null,
  name: null as string | null
}

const userNameReducer = (state = initialState, action: setIdAction | setNameAction) => {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        id: action.payload,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state;
  }
};
export default userNameReducer;
