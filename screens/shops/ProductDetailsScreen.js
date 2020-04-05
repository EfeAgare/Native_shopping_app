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
import Colors from '../../constants/Colors';

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector((state) => {
    return state.products.availableProduct.find(
      (product) => product.id === productId
    );
  });
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={style.actions}>
        {' '}
        <Button title='Add to Cart' onPress={() => {}} color={Colors.primary} />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>${selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
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
  },
  actions: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
