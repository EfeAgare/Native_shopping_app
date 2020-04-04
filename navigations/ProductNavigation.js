import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductScreenOverview from '../screens/shops/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shops/ProductDetailsScreen';
import Colors from '../constants/Colors';

const ProductNavigation = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductScreenOverview,
    },
    ProductDetails: ProductDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductNavigation);
