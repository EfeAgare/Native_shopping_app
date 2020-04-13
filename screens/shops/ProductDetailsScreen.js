import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import * as cartActions from '../../redux/actions/cart';

const ProductDetailsScreen = (props) => {
  const productId = props.route.params ? props.route.params.productId : null;

  const dispatch = useDispatch(); // mapDispatchToProps

  const selectedProduct = useSelector((state) => {
    return state.products.availableProduct.find(
      (product) => product.id === productId
    );
  });
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title='Add to Cart'
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const productDetailsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params
      ? navData.route.params.productTitle
      : null,
  };
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
