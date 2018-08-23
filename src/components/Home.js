import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import ColorEngine from '../engine/ColorEngine';
import levelsConfig from '../config/LevelsConfig.json';
import { getHighestLevel, setHighestLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';

class Home extends Component {

  constructor(props) {
    super(props);
    this.colorEngine = new ColorEngine(4, 3, tinycolor(Utils.colors.defaultUpperLeft), tinycolor(Utils.colors.defaultUpperRight), tinycolor(Utils.colors.defaultLowerLeft), tinycolor(Utils.colors.defaultLowerRight));
  }

  componentWillMount() {
    console.log("HOME-ComponentWillMount");
    getHighestLevel();
  }

  render() {
    const { highestLevel, gameLevel, setLevel } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Utils.colors.themeBackgroundColor }}>
        <View>
          <Text>Highest Level</Text>
          <Text>{highestLevel}</Text>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Game', {
              currentLevel: item.level
            })}
          >
            <Text>Profile</Text>
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
    setLevel: () => {
      dispatch({
        type: 'SET_LEVEL',
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
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