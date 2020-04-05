import React from 'react';
import { StyleSheet, FlatList, Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
  const { orders } = useSelector((state) => state.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <OrderItem order={itemData.item} />}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
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
          title={'Cart'}
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() =>
            navData.navigation.navigate({
              routeName: 'Cart',
            })
          }
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({});
