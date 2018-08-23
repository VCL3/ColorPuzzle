import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers';
import { RootNavigator, middleware } from './src/navigators/AppNavigator';
import { StyleSheet, Text, View } from 'react-native';
import './src/Storage';

export const store = createStore(AppReducer, applyMiddleware(middleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}