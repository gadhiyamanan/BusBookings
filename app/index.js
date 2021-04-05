import React from 'react';
import {useEffect} from 'react';
import Navigation from './navigation/Index';

import {Provider} from 'react-redux';
import configureStore from './utils/store';
const store = configureStore;
export default function Index() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
