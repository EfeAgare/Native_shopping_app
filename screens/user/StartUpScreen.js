import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Colors from '../../constants/Colors';
import { authenticate } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const alreadyLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const { token, userId, expiryDate } = JSON.parse(userData);
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      dispatch(authenticate(userId, token));
      props.navigation.navigate('Shop');
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
