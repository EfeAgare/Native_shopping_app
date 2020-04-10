import { AsyncStorage } from 'react-native';

import { AUTHENTICATE } from '../constants/actionIndentifier';
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

      dispatch(authenticate(signUp.localId, signUp.idToken));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(signUp.expiresIn) * 1000
      );
      saveDataToStorage(signUp.idToken, signUp.localId, expirationDate);
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

      dispatch(authenticate(login.localId, login.idToken));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(login.expiresIn) * 1000
      );

      saveDataToStorage(login.idToken, login.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};
