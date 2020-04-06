import React from 'react';
import { FlatList, Platform } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';

import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const UserProductScreen = () => {
  const userProduct = useSelector((state) => state.products.userProduct);
  return (
    <FlatList
      data={userProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetails={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title={'Menu'}
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;
