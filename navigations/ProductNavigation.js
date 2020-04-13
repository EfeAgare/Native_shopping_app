// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import ProductsOverviewScreen, {
  productsOverviewScreenOptions,
} from '../screens/shops/ProductsOverviewScreen';
import ProductDetailsScreen, {
  productDetailsScreenOptions,
} from '../screens/shops/ProductDetailsScreen';
import Colors from '../constants/Colors';
import CartScreen, { cartScreenOptions } from '../screens/shops/CartScreen';
import OrdersScreen, {
  ordersScreenOptions,
} from '../screens/shops/OrdersScreen';

import UserProductScreen, {
  userProductScreenOptions,
} from '../screens/user/UserProductScreen';
import EditProductScreen, {
  editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerBackTitle: null,
};

const ProductStackNavigator = createStackNavigator();

export const ProductNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductStackNavigator.Screen
        name='ProductDetails'
        component={ProductDetailsScreen}
        options={productDetailsScreenOptions}
      />
      <ProductStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductStackNavigator.Navigator>
  );
};

// Orders Navigation
const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
      <OrdersStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const UserStackNavigator = createStackNavigator();

export const UserNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserStackNavigator.Screen
        name='UserScreen'
        component={UserProductScreen}
        options={userProductScreenOptions}
      />
      <UserStackNavigator.Screen
        name='EditScreen'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </UserStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerStyle={{
        width: 240,
        paddingTop: 30
      }}
      drawerContentOptions={{
        activeTintColors: Colors.primary,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  dispatch(logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-albums' : 'ios-albums'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='MyProducts'
        component={UserNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
