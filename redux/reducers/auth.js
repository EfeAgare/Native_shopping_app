import {
  LOGIN,
  SIGN_UP,
  AUTHENTICATE,
  LOGOUT,
  DID_TRY_LOGIN,
} from '../constants/actionIndentifier';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    // case SIGN_UP:
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    case DID_TRY_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};

export default authReducers;
