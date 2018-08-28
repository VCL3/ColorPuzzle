import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Home from '../components/Home';
import Profile from '../components/Profile';
import NewPuzzle from '../components/NewPuzzle';
import Game from '../components/Game';
import Utils from '../utils/Utils';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: Utils.colors.themeBackgroundColor,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
    Game: {
      screen: Game,
    },
    NewPuzzle: {
      screen: NewPuzzle
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

// const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

// const mapStateToProps = state => ({
//   state: state.nav,
// });

// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

// export { RootNavigator, AppNavigator, middleware };
export { RootNavigator, middleware };