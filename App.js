import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Store';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';
import Board from './src/components/Board';
import Utils from './src/utils/Utils';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <View style={styles.container}>
          <View style={styles.header} />
          <Board headerHeight={HEADER_HEIGHT} />
          <View style={styles.footer} />
        </View> */}
        <Game />
      </Provider>
    );
  }
}

const HEADER_HEIGHT = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});
