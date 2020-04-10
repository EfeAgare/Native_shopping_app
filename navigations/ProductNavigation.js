import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { Platform } from 'react-native';

import ProductScreenOverview from '../screens/shops/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shops/ProductDetailsScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shops/CartScreen';
import OrdersScreen from '../screens/shops/OrdersScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/user/StartUpScreen';

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
    Cart: CartScreen,
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

const UserNavigator = createStackNavigator(
  {
    UserScreen: UserProductScreen,
    EditScreen: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
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
    MyProducts: UserNavigator,
  },
  {
    contentOptions: {
      activeTintColors: Colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
