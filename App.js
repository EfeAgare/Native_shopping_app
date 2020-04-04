import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductNavigation from './navigations/ProductNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <ProductNavigation />
    </Provider>
  );
}

