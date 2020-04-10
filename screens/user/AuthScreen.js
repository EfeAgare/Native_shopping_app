import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { formReducer } from './EditProductScreen';
import { FORM_INPUT_UPDATE } from '../constant/useReducerState';
import { signupUser, loginUser } from '../../redux/actions/auth';

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    props.navigation.setParams({ title: isSignup ? 'Sign Up' : 'Login' });
  }, [isSignup]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const { email, password } = formState.inputValues;

  const onInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  const authHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let auth;

    if (isSignup) {
      auth = signupUser(email, password);
    } else {
      auth = loginUser(email, password);
    }

    try {
      await dispatch(auth);
      props.navigation.navigate('Shop');
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setError(error.message);
    }
  }, [dispatch, isSignup, setIsLoading, setError, email, password]);

  useEffect(() => {
    if (error) {
      return Alert.alert('Error', 'Wrong email or password', [
        { text: 'Okay' },
      ]);
    }
  }, [error, Alert.alert]);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              autoCorrect
              label='E-Mail'
              keyboardType='email-address'
              errorText='Please Enter a valid email address  '
              onInputChange={onInputChangeHandler}
              initialValue={''}
              initiallyValid={false}
              required
              email
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              errorText='Please Enter a valid password'
              onInputChange={onInputChangeHandler}
              initialValue={''}
              initiallyValid={false}
              required
              minLength={6}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color={Colors.primary}
                onPress={authHandler}
                disabled={!formState.formIsValid}
              />
            </View>
            <View>
              {isLoading ? (
                <View style={styles.centered}>
                  <ActivityIndicator size='small' color={Colors.primary} />
                </View>
              ) : (
                <Button
                  title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

AuthScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'flex-start',
    // marginTop: 140,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
