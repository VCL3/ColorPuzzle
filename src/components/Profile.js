import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GridView from 'react-native-super-grid';
import { storageGetHighestLevel, storageSetHighestLevel, storageSetCustomLevels } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';

import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { highestLevel, setHighestLevel } = this.props;

    return (
      <View style={styles.home}>
        <TouchableOpacity 
          onPress={() => {
            setHighestLevel(1);
            storageSetHighestLevel(1);
            storageSetCustomLevels([{
              "level": 1,
              "colors": ["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"]
            }]);
          }}
        >
          <Text>Reset All Levels</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    highestLevel: state.gameReducer.highestLevel,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    setHighestLevel: (highestLevel) => {
      dispatch({
        type: 'SET_HIGHEST_LEVEL',
        highestLevel: highestLevel,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});