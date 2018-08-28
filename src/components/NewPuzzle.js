import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GridView from 'react-native-super-grid';
import Board from './Board';
import { storageGetCustomLevel, storageSetCustomLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';
import Icon from 'react-native-vector-icons/Ionicons';

class NewPuzzle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"],
      colorSquareSelected: false,
    }
  }

  render() {

    const { gameMoves, addMove } = this.props;

    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <GridView
            itemDimension={20}
            items={this.state.colors}
            style={styles.gameGrid}
            renderItem={item => {
              console.log(item);
              <TouchableOpacity onPress={() => {}}>
                <View styles={[styles.gameTile, { backgroundColor: 'red' }]}></View>
              </TouchableOpacity>
            }}
          />
          {/* <View style={styles.colorColumn}>
            <View style={styles.colorRow}>
              <TouchableOpacity onPress={() => {}}>
                <View styles={styles.colorSquare}></View>
              </TouchableOpacity>

            </View>
            <View style={styles.colorRow}>
              <TouchableOpacity onPress={() => {}} />
              <TouchableOpacity onPress={() => {}} />
            </View>
          </View> */}
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.largeButton}>
              <Text style={{ fontSize: 20 }}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
        { this.state.colorSquareSelected && (<Text>Hello</Text>) }
        <Board
          ref={instance => { this.board = instance; }}
          headerHeight={HEADER_HEIGHT}
          width={7}
          height={7}
          colors={this.state.colors}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPuzzle);

const screenLessBoardHeight = Utils.size.height - Utils.size.width * Utils.widthHeightRatio;
if (screenLessBoardHeight / 2 < 150) {
  HEADER_HEIGHT = 150;
} else {
  HEADER_HEIGHT = screenLessBoardHeight / 2;
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
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
  gameGrid: {
    width: 80,
    height: 100,
    backgroundColor: Utils.colors.themeLightGrey
  },
  gameTile: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 80,
  },
  colorColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSquare: {

  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width * Utils.widthHeightRatio,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});