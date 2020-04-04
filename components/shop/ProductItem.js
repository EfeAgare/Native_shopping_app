import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import Colors from '../../constants/Colors'

const ProductItem = (props) => {
  const { imageUrl, title, price, onViewDetails, onAddToCart } = props.product;
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          // color={Colors.primary}
          title='View Betails'
          onPress={() => {
            onViewDetails;
          }}
        />
        <Button
          // color={Colors.primary}
          title='To Cart'
          onPress={() => {
            onAddToCart;
          }}
        />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 5,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '24%',
    paddingHorizontal: 20,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '60%',
    overflow: 'hidden',
  },
});
