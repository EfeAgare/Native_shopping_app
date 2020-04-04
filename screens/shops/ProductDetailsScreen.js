import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector((state) => {
    return state.products.availableProduct.find(
      (product) => product.id === productId
    );
  });
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
