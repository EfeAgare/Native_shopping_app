import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { Platform } from 'react-native';

import ProductScreenOverview from '../screens/shops/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shops/ProductDetailsScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shops/CartScreen';
import OrdersScreen from '../screens/shops/OrdersScreen';
import {
  createDrawerNavigator,
  DrawerIconProps,
} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerBackTitle: null,
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductScreenOverview,
    },
    ProductDetails: ProductDetailsScreen,
    Cart: {
      screen: CartScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColors}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

// Orders Navigation
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColors}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

// Drawer Navigation
const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColors: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
