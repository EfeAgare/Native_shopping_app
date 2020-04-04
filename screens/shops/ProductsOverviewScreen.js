import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = (props) => {
  const { availableProduct } = useSelector((state) => state.products);
  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
      style={{ width: '100%' }}
    />
  );
};

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

const styles = StyleSheet.create({});
