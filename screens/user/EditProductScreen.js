import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
} from 'react-native';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/actions/products';
import { FORM_INPUT_UPDATE } from '../constant/useReducerState';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;

      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        formIsValid: updatedFormIsValid,
        inputValues: updateValues,
        inputValidities: updatedValidities,
      };

    default:
      return state;
  }
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = props.navigation.getParam('productId');
  const editProduct = useSelector((state) =>
    state.products.userProduct.find((prod) => prod.id === productId)
  );


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      description: editProduct ? editProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsValid: editProduct ? true : false,
  });

  // using useReducer to manage state instead of useState

  // const [title, setTitle] = useState(editProduct ? editProduct.title : '');
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [price, setPrice] = useState('');
  // const [imageUrl, setImageUrl] = useState(
  //   editProduct ? editProduct.imageUrl : ''
  // );
  // const [description, setDescription] = useState(
  //   editProduct ? editProduct.description : ''
  // );

  const dispatch = useDispatch();

  const { title, imageUrl, description, price } = formState.inputValues;

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editProduct) {
        await dispatch(updateProduct(productId, title, imageUrl, description));
      } else {
        await dispatch(createProduct(title, imageUrl, +price, description));
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState, setError, setIsLoading]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title='Try again' color={Colors.primary} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            autoCapitalize='sentences'
            autoCorrect
            label='Title'
            errorText='Please Enter a valid Title'
            onInputChange={onInputChangeHandler}
            initialValue={editProduct ? editProduct.title : ''}
            initiallyValid={!!editProduct}
            required
          />
          {editProduct ? null : (
            <Input
              id='price'
              autoCorrect
              label='Price'
              errorText='Please Enter a valid Price'
              keyboardType='decimal-pad'
              onInputChange={onInputChangeHandler}
              initialValue={''}
              required
              min={0.1}
            />
          )}
          <Input
            id='imageUrl'
            autoCapitalize='sentences'
            autoCorrect
            label='ImageUrl'
            errorText='Please Enter a valid imageUrl'
            keyboardType='default'
            onInputChange={onInputChangeHandler}
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initiallyValid={!!editProduct}
            required
          />
          <Input
            id='description'
            autoCapitalize='sentences'
            autoCorrect
            label='Description'
            errorText='Please Enter a valid decription'
            keyboardType='default'
            multiline
            numberOfLines={3}
            value={formState.inputValues.description}
            onInputChange={onInputChangeHandler}
            initialValue={editProduct ? editProduct.description : ''}
            initiallyValid={!!editProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const edit = navData.navigation.getParam('productId');
  const submit = navData.navigation.getParam('submit');
  return {
    headerTitle: edit ? 'Edit Product' : 'Create Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title={'Save'}
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submit}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
