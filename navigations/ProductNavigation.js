// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen, {
  userProductScreenOptions,
} from '../screens/user/UserProductScreen';
import EditProductScreen, {
  editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/user/StartUpScreen';
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

const productNavigationScreensOption = (props) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={props.color}
      />
    ),
  };
};
export const ProductNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductStackNavigator.screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={{
          productsOverviewScreenOptions,
          productNavigationScreensOption,
        }}
      />
      <ProductStackNavigator.screen
        name='ProductDetails'
        component={ProductDetailsScreen}
        options={{
          productDetailsScreenOptions,
          productNavigationScreensOption,
        }}
      />
      <ProductStackNavigator.screen
        name='Cart'
        component={CartScreen}
        options={{
          cartScreenOptions,
          productNavigationScreensOption,
        }}
      />
    </ProductStackNavigator.Navigator>
  );
};
// const ProductNavigator = createStackNavigator(
//   {
//     ProductsOverview: {
//       screen: ProductScreenOverview,
//     },
//     ProductDetails: ProductDetailsScreen,
//     Cart: {
//       screen: CartScreen,
//     },
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColors}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const OrdersStackNavigator = createStackNavigator();
// Orders Navigation

const orderNavigationScreensOptions = () => {
  return {
    drawerIcon: (props) => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={props.color}
      />
    ),
  };
};
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={{
          ordersScreenOptions,
          orderNavigationScreensOptions,
        }}
      />
      <OrdersStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={{
          cartScreenOptions,
          orderNavigationScreensOptions,
        }}
      />
    </OrdersStackNavigator.Navigator>
  );
};
// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColors}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const UserStackNavigator = createStackNavigator();

const userNavigationScreensOptions = (props) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={props.color}
      />
    ),
  };
};

export const UserNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserStackNavigator.Screen
        name='UserScreen'
        component={UserProductScreen}
        options={{
          userProductScreenOptions,
          userNavigationScreensOptions,
        }}
      />
      <UserStackNavigator.Screen
        name='EditScreen'
        component={EditProductScreen}
        options={{
          editProductScreenOptions,
          userNavigationScreensOptions,
        }}
      />
    </UserStackNavigator.Navigator>
  );
};

// const UserNavigator = createStackNavigator(
//   {
//     UserScreen: UserProductScreen,
//     EditScreen: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColors}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
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
                  props.navigation.navigate('Auth');
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
      />
      <ShopDrawerNavigator.Screen name='Orders' component={OrdersNavigator} />
      <ShopDrawerNavigator.Screen name='MyProducts' component={UserNavigator} />
    </ShopDrawerNavigator.Navigator>
  );
};
// Drawer Navigation
// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductNavigator,
//     Orders: OrdersNavigator,
//     MyProducts: UserNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColors: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerItems {...props} />
//             <Button
//               title='Logout'
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(logout());
//                 props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator>
  );
};
// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   { defaultNavigationOptions: defaultNavOptions }
// );

// const MainNavigator = createSwitchNavigator({
//   Start: StartUpScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

export default createAppContainer(MainNavigator);
