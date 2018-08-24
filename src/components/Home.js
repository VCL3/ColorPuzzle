import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import ColorEngine from '../engine/ColorEngine';
import levelsConfig from '../config/LevelsConfig.json';
import { storageGetHighestLevel, storageSetHighestLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';

import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {

  constructor(props) {
    super(props);
    this.colorEngine = new ColorEngine(4, 3, tinycolor(Utils.colors.themeUpperLeft), tinycolor(Utils.colors.themeUpperRight), tinycolor(Utils.colors.themeLowerLeft), tinycolor(Utils.colors.themeLowerRight));
  }

  componentWillMount() {
    console.log("HOME-ComponentWillMount");
    storageGetHighestLevel();
  }

  render() {
    const { highestLevel } = this.props;

    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.highestLevel}>
            <Text>Highest Level</Text>
            <Text>#{highestLevel}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Icon name="md-person" size={60} color={Utils.colors.themeLightBlack} />
          </TouchableOpacity>
        </View> 
        <GridView
          itemDimension={80}
          items={levelsConfig}
          style={styles.gameGrid}
          renderItem={item => {
            if (item.level > highestLevel) {
              return (
                <View style={[styles.gameTile, { backgroundColor: this.colorEngine.getCorrectColorForIndex(item.level - 1) }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.gameLevel, { color: '#8C8A8F' }]}>{item.level}</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={[styles.gameTile, { backgroundColor: tinycolor(item.colors[0]).toRgbString() }]}>
                  <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Game', {
                      currentLevel: item.level
                    })}
                    style={{ flex: 1 }}
                  >
                    <Text style={[styles.gameLevel, { color: '#fff', }]}>{item.level}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    highestLevel: state.gameReducer.highestLevel,
    gameLevel: state.gameReducer.gameLevel,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  highestLevel: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-around",
  },
  gameGrid: {
    paddingTop: 25,
    flex: 1,
  },
  gameTile: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 80,
  },
  gameLevel: {
    fontSize: 20,
    fontWeight: '600',
  },
});