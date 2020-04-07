import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View
} from 'react-native';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/actions/products';

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const editProduct = useSelector((state) =>
    state.products.userProduct.find((prod) => prod.id === productId)
  );
  const [title, setTitle] = useState(editProduct ? editProduct.title : '');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ''
  );
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ''
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editProduct) {
      dispatch(updateProduct(productId, title, imageUrl, description));
    } else {
      dispatch(createProduct(title, imageUrl, +price, description));
    }
    props.navigation.goBack()
  }, [dispatch, productId, title, price, imageUrl, description]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>
        {editProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
              }}
              keyboardType={'numeric'}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => {
              setImageUrl(text);
            }}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: '100%',
  },
  label: { fontFamily: 'open-sans-bold', marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
