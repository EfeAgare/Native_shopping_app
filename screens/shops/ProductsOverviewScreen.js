import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../redux/actions/cart';
import CustomHeaderButtons from '../../components/UI/CustomHeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { fetchAllProduct } from '../../redux/actions/products';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  loadProducts = useCallback(async () => {
    setErrorMessage(null)
    setIsLoading(true);
    try {
      await dispatch(fetchAllProduct());
    } catch (error) {
      setErrorMessage(error);
    }
    setIsLoading(false);
  }, [dispatch, setErrorMessage, setIsLoading]);

  const availableProduct = useSelector(
    (state) => state.products.availableProduct
  );

  // initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // set up listener for live update, subsequent loading
  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', () => {
      loadProducts();
    });
    return () => {
      willFocus.remove(); // clean up
    };
  }, [loadProducts]);


  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button
          title='Try again'
          onPress={() => loadProducts()}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && availableProduct.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        >
          <Button
            color={Colors.primary}
            title='View Betails'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
      style={{ width: '100%' }}
    />
  );
};

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
