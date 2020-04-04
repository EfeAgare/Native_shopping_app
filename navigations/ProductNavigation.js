import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProductScreenOverview from '../screens/shops/ProductsOverviewScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const ProductNavigation = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductScreenOverview,
    },
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
