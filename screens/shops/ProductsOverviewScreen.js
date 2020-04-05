import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../redux/actions/cart';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

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

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title={'Cart'}
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate({
            routeName: 'Cart'
          })}
        />
      </HeaderButtons>
    ),
  };
};
