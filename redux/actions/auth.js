import { LOGIN, SIGN_UP } from '../constants/actionIndentifier';
import { sendHttpRequest } from '../utils/apiInstance';
import { FIRE_BASE_API } from 'react-native-dotenv';

export const signupUser = (email, password) => {
  return async (dispatch) => {
    try {
      const signUp = await sendHttpRequest(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIRE_BASE_API}`,
        'POST',
        JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        { 'content-type': 'application/json' }
      );

      dispatch({
        type: SIGN_UP,
        token: signUp.idToken,
        userId: signUp.localId,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const login = await sendHttpRequest(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIRE_BASE_API}`,
        'POST',
        JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        { 'content-type': 'application/json' }
      );

      dispatch({ type: LOGIN, token: login.idToken, userId: login.localId });
    } catch (error) {
      throw error;
    }
  };
};
