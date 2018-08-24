import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { storageGetHighestLevel, storageSetHighestLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';

import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const { highestLevel, setHighestLevel } = this.props;

    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <Text>Highest Level</Text>
          <Text>{highestLevel}</Text>
          <TouchableOpacity 
            onPress={() => {
              setHighestLevel(1);
              storageSetHighestLevel(1);
            }}
          >
            <Text>Clear Local Data</Text>
          </TouchableOpacity>
        </View> 
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
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
  },
});