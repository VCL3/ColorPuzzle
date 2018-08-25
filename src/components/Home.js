import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import ColorEngine from '../engine/ColorEngine';
import levelsConfig from '../config/LevelsConfig.json';
import { storageGetHighestLevel, storageSetHighestLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';

class Home extends Component {

  static navigationOptions = { 
    header: null 
  };

  constructor(props) {
    super(props);
    this.colorEngine = new ColorEngine(4, 9, tinycolor(Utils.colors.themeUpperLeft), tinycolor(Utils.colors.themeUpperRight), tinycolor(Utils.colors.themeLowerLeft), tinycolor(Utils.colors.themeLowerRight));
  }

  componentWillMount() {
    storageGetHighestLevel();
  }

  render() {
    const { highestLevel } = this.props;

    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.highestLevelContainer}>
            <Text style={styles.highestLevel}>Next Level</Text>
            <Text style={[styles.highestLevel, { fontSize: 35 }]}>#{highestLevel}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Icon name="md-person" size={44} color={Utils.colors.themeLightBlack} />
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
    paddingTop: getStatusBarHeight(),
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  header: {
    width: Utils.size.width,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  highestLevelContainer: {
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  highestLevel: {
    fontSize: 20,
    fontWeight: '600',
  },
  gameGrid: {
    flex: 1,
    backgroundColor: Utils.colors.themeBackgroundColor,
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