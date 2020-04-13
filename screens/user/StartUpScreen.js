import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Colors from '../../constants/Colors';
import { authenticate , setDidTryLogin} from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const alreadyLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        dispatch(setDidTryLogin())
        // props.navigation.navigate('Auth');
        return;
      }
      const { token, userId, expiryDate } = JSON.parse(userData);
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(setDidTryLogin())
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(authenticate(userId, token, expirationTime));
    };
    alreadyLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={'large'} color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
