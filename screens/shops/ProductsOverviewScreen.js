import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../redux/actions/cart';

const ProductsOverviewScreen = (props) => {
  const { availableProduct } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetails={() =>
            props.navigation.navigate({
              routeName: 'ProductDetails',
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            })
          }
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
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
