import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductScreenOverview from '../screens/shops/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shops/ProductDetailsScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shops/CartScreen';

const ProductNavigation = createStackNavigator(
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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      headerBackTitle: null,
    },
  }
);

export default createAppContainer(ProductNavigation);
