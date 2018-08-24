import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import LevelsFactory from '../engine/LevelsFactory';
import Board from './Board';
import { storageSetHighestLevel } from '../Storage';
import {
  GAME_IDLE,
  GAME_OVER,
  GAME_STARTED,
  GAME_PAUSED,
} from '../utils/GameStatus';
import PropTypes from 'prop-types';
import Utils from '../utils/Utils';

class Game extends Component {

  static navigationOptions = {
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);

    this.LevelsFactory = new LevelsFactory();

    this.state = {
      currentLevel: this.props.navigation.getParam('currentLevel', 1),
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { tileSize, gridSize } = this.props;
  //   const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);
  // }

  handleGameWin = () => {
    // Update level and clear move
    const { highestLevel, addHighestLevel, addLevel, clearMove } = this.props;
    if (this.state.currentLevel === highestLevel) {
      addHighestLevel();
      storageSetHighestLevel(this.state.currentLevel + 1);
    }   
    clearMove();
    this.props.navigation.push('Game', {
      currentLevel: this.state.currentLevel + 1,
    });
    // storage.save({
    //   key: 'level',  // 注意:请不要在key中使用_下划线符号!
    //   data: { 
    //     level: level,
    //   },
    //   // 如果不指定过期时间，则会使用defaultExpires参数
    //   // 如果设为null，则永不过期
    //   expires: null
    // });
  }

  render() {
    console.log("Render-Game");
    const { highestLevel, gameMoves, addHighestLevel, addMove, clearMove } = this.props;
    const { width, height, colors } = this.LevelsFactory.getSetupForLevel(this.state.currentLevel);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            onPress={() => {
              clearMove();
              this.props.navigation.popToTop();
            }}
            title="Go Back"
          />
          <View style={styles.score}>
            <Text>Level</Text>
            <Text style={styles.moves}>{this.state.currentLevel}</Text>
          </View>
          <View style={styles.score}>
            <Text>Move</Text>
            <Text style={styles.moves}>{gameMoves}</Text>
          </View>
        </View>
        <Board 
          headerHeight={HEADER_HEIGHT}
          width={width}
          height={height}
          colors={colors}
          addMove={addMove}
          handleGameWin={this.handleGameWin}
        />
        <View style={styles.footer} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    highestLevel: state.gameReducer.highestLevel,
    gameMoves: state.gameReducer.gameMoves,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    addHighestLevel: () => {
      dispatch({
        type: 'ADD_HIGHEST_LEVEL',
      });
    },
    addMove: () => {
      dispatch({
        type: 'ADD_GAME_MOVE',
      });
    },
    clearMove: () => {
      dispatch({
        type: 'CLEAR_GAME_MOVE',
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// Game.propTypes = {
//   numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
//   original: PropTypes.arrayOf(PropTypes.number),
//   tileSize: PropTypes.number,
//   gridSize: PropTypes.number,
//   moves: PropTypes.number,
//   seconds: PropTypes.number,
// };

// Game.defaultProps = {
//   level: 0,
//   moves: 0,
// };

const HEADER_HEIGHT = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: Utils.colors.themeBackgroundColor,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
  },
  score: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  moves: {
    fontSize: 24,
    color: 'black',
  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width * Utils.widthHeightRatio,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});