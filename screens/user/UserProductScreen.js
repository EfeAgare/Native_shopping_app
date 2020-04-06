import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../redux/actions/products';

const UserProductScreen = (props) => {
  const userProduct = useSelector((state) => state.products.userProduct);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => {}}
        >
          <Button color={Colors.primary} title='Edit' onPress={() => {}} />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => dispatch(deleteProduct(itemData.item.id))}
          />
        </ProductItem>
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
