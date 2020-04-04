import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  const { availableProduct } = useSelector((state) => state.products);
  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetails={() => {}}
          onAddToCart={() => {}}
        />
      )}
      style={{ width: '100%' }}
    />
  );
};

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};
