import React from 'react';
import { FlatList, Platform, Button, Alert, View, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../redux/actions/products';

const UserProductScreen = (props) => {
  const userProduct = useSelector((state) => state.products.userProduct);

  const editProductHandler = (id) => {
    props.navigation.navigate('EditScreen', {
      productId: id,
    });
  };

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {
        text: 'No',
        style: 'default',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProduct.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No products found, maybe start creating one</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
          onAddToCart={() => {}}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export const userProductScreenOptions = (navData) => {
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title={'Menu'}
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navData.navigation.navigate('EditScreen')}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;
