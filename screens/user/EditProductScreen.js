import React, { useCallback, useEffect, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/actions/products';
import { FORM_INPUT_UPDATE } from '../constant/useReducerState';
import Input from '../../components/UI/Input';

const formReducer = (state, action) => {
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

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (editProduct) {
      dispatch(updateProduct(productId, title, imageUrl, description));
    } else {
      dispatch(createProduct(title, imageUrl, +price, description));
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

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
            returnKeyType='next'
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
              returnKeyType='next'
              label='Price'
              errorText='Please Enter a valid Price'
              keyboardType='decimal-pad'
              returnKeyType='next'
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
            returnKeyType='next'
            label='ImageUrl'
            errorText='Please Enter a valid imageUrl'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={onInputChangeHandler}
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initiallyValid={!!editProduct}
            required
          />
          <Input
            id='description'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
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
});
