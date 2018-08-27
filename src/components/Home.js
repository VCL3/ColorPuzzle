import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
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
    this.state = {
      pagination: 0
    }
  }

  componentWillMount() {
    storageGetHighestLevel();
  }

  render() {
    const { highestLevel } = this.props;

    let titleWord;
    if (this.state.pagination === 0) {
      titleWord = <Text style={[styles.highestLevel, { fontSize: 35 }]}>#{highestLevel}</Text>
    } else {
      titleWord = <Text style={[styles.highestLevel, { fontSize: 35 }]}>:)</Text>
    }

    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.highestLevelContainer}>
            <Text style={styles.highestLevel}>Next Level</Text>
            {titleWord}
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Icon name="md-person" size={40} color={Utils.colors.themeLightBlack} />
          </TouchableOpacity>
        </View>
        <Swiper 
          showsButtons={false} 
          loop={false} 
          showsPagination={true}
          paginationStyle={styles.swiperDots}
          activeDotColor={Utils.colors.themeDarkBlue}
          onIndexChanged={(index) => this.setState({ pagination: index })}>
          <View style={styles.swiperItem}>
            <View style={styles.swiperItemTitleComp}>
              <Text style={[styles.swiperItemTitle, { paddingRight: 5 }]}>Basic Mode</Text>
              <Icon name="ios-arrow-dropright" size={18} color={Utils.colors.themeDarkBlue} />
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
          <View style={styles.swiperItem}>
            <View style={styles.swiperItemTitleComp}>
              <Icon name="ios-arrow-dropleft" size={18} color={Utils.colors.themeDarkBlue} />
              <Text style={[styles.swiperItemTitle, { paddingLeft: 5 }]}>Creative Mode</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.largeButton}>
                <Text style={{ fontSize: 20 }}>Create New Puzzle</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Swiper>
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
  swiperDots: {
    paddingBottom: Utils.size.height - Utils.size.statusBarHeight - 150,
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  swiperItemTitleComp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "flex-end",
    paddingBottom: 15,
  },
  swiperItemTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: Utils.colors.themeDarkBlue,
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
  largeButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, 
    height: 80, 
    borderRadius: 5, 
    borderWidth: 3, 
    borderColor: Utils.colors.themeDarkRed,
  }
});