import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import LevelsFactory from '../engine/LevelsFactory';
import Board from './Board';
import { storageSetHighestLevel } from '../Storage';
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

  handleGameWin = () => {
    // Update level and clear move
    const { highestLevel, addHighestLevel, clearMove } = this.props;
    if (this.state.currentLevel === highestLevel) {
      addHighestLevel();
      storageSetHighestLevel(this.state.currentLevel + 1);
    }   
    clearMove();
    this.props.navigation.push('Game', {
      currentLevel: this.state.currentLevel + 1,
    });
  }

  render() {
    const { gameMoves, addMove, clearMove } = this.props;
    const { width, height, colors } = this.LevelsFactory.getSetupForLevel(this.state.currentLevel);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => {
              clearMove();
              this.props.navigation.popToTop();
            }}
          >
            <Icon name='ios-arrow-back' size={44} color={Utils.colors.themeLightBlack} />
          </TouchableOpacity>
          <View style={styles.statContainer}>
            <Text style={styles.statTitle}>LEVEL</Text>
            <Text style={styles.statNumber}>{this.state.currentLevel}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statTitle}>MOVE</Text>
            <Text style={styles.statNumber}>{gameMoves}</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statTitle}>HINT</Text>
            <TouchableOpacity onPress={() => { this.board.handleHint() }}>
              <Icon name='ios-add-circle-outline' size={28} color={Utils.colors.themeLightBlack} />
            </TouchableOpacity>
          </View>
        </View>
        <Board
          ref={instance => { this.board = instance; }}
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

const screenLessBoardHeight = Utils.size.height - Utils.size.width * Utils.widthHeightRatio;
if (screenLessBoardHeight / 2 < 150) {
  HEADER_HEIGHT = 150;
} else {
  HEADER_HEIGHT = screenLessBoardHeight / 2;
}
const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: getStatusBarHeight(),
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  statContainer: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgb(218, 119, 125)',
  },
  statNumber: {
    fontSize: 25,
    color: Utils.colors.themeLightBlack,
  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width * Utils.widthHeightRatio,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});