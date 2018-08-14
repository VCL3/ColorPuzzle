import React, { Component } from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import Board from './Board';
import {
  GAME_IDLE,
  GAME_OVER,
  GAME_STARTED,
  GAME_PAUSED,
} from '../utils/GameStatus';
import PropTypes from 'prop-types';
import Utils from '../utils/Utils';

export default class Game extends Component {

  constructor(props) {
    super(props);

    // const { numbers, tileSize, gridSize, moves, seconds } = props;

    this.state = {
      gameState: GAME_IDLE,
      moves: 0,
      dialogOpen: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { tileSize, gridSize } = this.props;
  //   const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);
  //   this.setState({
  //     gameState: GAME_IDLE,
  //     tiles: newTiles,
  //     moves: 0,
  //     seconds: 0,
  //   });
  //   clearInterval(this.timerId);
  // }

  // handleDialogClose = () => {
  //   this.setState({
  //     dialogOpen: false,
  //   });
  // };

  // generateTiles(numbers, gridSize, tileSize) {
  // }

  // isGameOver(tiles) {
  //   const correctedTiles = tiles.filter(tile => {
  //     return tile.tileId + 1 === tile.number;
  //   });

  //   if (correctedTiles.length === (this.props.gridSize) ** 2) {
  //     clearInterval(this.timerId);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // addTimer() {
  //   this.setState(prevState => {
  //     return { seconds: prevState.seconds + 1 };
  //   });
  // }

  // setTimer() {
  //   this.timerId = setInterval(
  //     () => {
  //       this.addTimer();
  //     },
  //     1000,
  //   );
  // }

  // onPauseClick = () => {
  //   this.setState(prevState => {
  //     let newGameState = null;
  //     let newSnackbarText = null;

  //     if (prevState.gameState === GAME_STARTED) {
  //       clearInterval(this.timerId);
  //       newGameState = GAME_PAUSED;
  //       newSnackbarText = 'The game is currently paused.';
  //     } else {
  //       this.setTimer();
  //       newGameState = GAME_STARTED;
  //       newSnackbarText = 'Game on!';
  //     }

  //     return {
  //       gameState: newGameState,
  //       snackbarOpen: true,
  //       snackbarText: newSnackbarText,
  //     };
  //   });
  // };

  render() {
    const { className } = this.props;

    // const actions = [
    //   <FlatButton label="Close" onTouchTap={this.handleDialogClose} />,
    // ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.moves}>{this.state.moves}</Text>
        </View>
        <Board headerHeight={HEADER_HEIGHT} />
        <View style={styles.footer} />
      </View>
    );
  }
}

// Game.propTypes = {
//   numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
//   original: PropTypes.arrayOf(PropTypes.number),
//   tileSize: PropTypes.number,
//   gridSize: PropTypes.number,
//   moves: PropTypes.number,
//   seconds: PropTypes.number,
// };

// Game.defaultProps = {
//   moves: 0,
//   seconds: 0,
// };

const HEADER_HEIGHT = 200;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: Utils.colors.themeBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  moves: {
    fontSize: 24,
    color: 'black',
  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});