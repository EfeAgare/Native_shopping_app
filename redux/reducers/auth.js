import {
  LOGIN,
  SIGN_UP,
  AUTHENTICATE,
  LOGOUT,
} from '../constants/actionIndentifier';

const initialState = {
  token: null,
  userId: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    // case SIGN_UP:
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };

    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default authReducers;
