import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';
import { SlidersColorPicker } from 'react-native-color';
import Board from './Board';
import { storageGetCustomLevel, storageSetCustomLevels, storageSetHighestLevel } from '../Storage';
import Utils from '../utils/Utils';
import tinycolor from 'tinycolor2';
import Icon from 'react-native-vector-icons/Ionicons';

class NewPuzzle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ["rgb 188 69 68", "rgb 89 175 241", "rgb 242 196 108", "rgb 243 243 243"],
      recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
      colorSquareSelected: false,
    }
  }

  render() {

    const { setCustomLevels, addMove, clearMove } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => {
              clearMove();
              this.props.navigation.goBack();
            }}
          >
            <Icon name='ios-arrow-back' size={44} color={Utils.colors.themeLightBlack} />
          </TouchableOpacity>
          <View style={styles.statContainer}>
            <Text style={styles.statTitle}>SIZE</Text>
            <Text style={styles.statNumber}>7</Text>
          </View>
          <View style={styles.colorColumn}>
            <View style={styles.colorRow}>              
              <TouchableOpacity onPress={() => { this.setState({ colorSquareSelected: 0 }) }}>
                <View style={[styles.colorSquare, { backgroundColor: Utils.formatRgbColor(this.state.colors[0]) }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ colorSquareSelected: 1 }) }}>
                <View style={[styles.colorSquare, { backgroundColor: Utils.formatRgbColor(this.state.colors[1]) }]} />
              </TouchableOpacity>
            </View>
            <View style={styles.colorRow}>
              <TouchableOpacity onPress={() => { this.setState({ colorSquareSelected: 2 }) }}>
                <View style={[styles.colorSquare, { backgroundColor: Utils.formatRgbColor(this.state.colors[2]) }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ colorSquareSelected: 3 }) }}>
                <View style={[styles.colorSquare, { backgroundColor: Utils.formatRgbColor(this.state.colors[3]) }]} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statTitle}>SAVE</Text>
            <TouchableOpacity onPress={() => {
              setCustomLevels();
              storageSetCustomLevels();  
            }}>
              <Icon name='ios-checkmark-circle-outline' size={28} color={Utils.colors.themeLightBlack} />
            </TouchableOpacity>
          </View>
        </View>
        { (this.state.colorSquareSelected !== false) &&  
          (<SlidersColorPicker
            visible={this.state.colorSquareSelected !== false}
            color={tinycolor(this.state.colors[this.state.colorSquareSelected])}
            returnMode={'rgb'}
            onCancel={() => this.setState({ colorSquareSelected: false })}
            onOk={color => {
              rgbColor = Utils.revertRgbColor(color);
              colorsCopy = this.state.colors.slice();
              colorsCopy[colorsCopy.indexOf(this.state.colors[this.state.colorSquareSelected])] = rgbColor;
              this.setState({
                colorSquareSelected: false,
                colors: colorsCopy,
                recents: [
                  tinycolor(color).toHexString(),
                  ...this.state.recents.filter(c => c !== tinycolor(color).toHexString()).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recents}
            swatchesLabel="RECENTS"
            okLabel="Done"
            cancelLabel="Cancel"
          />)
        }
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
    customLevels: state.gameReducer.customLevels,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    setCustomLevels: (customLevels) => {
      dispatch({
        type: 'SET_CUSTOM_LEVELS',
        customLevels: customLevels,
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
if (screenLessBoardHeight / 2 < 200) {
  HEADER_HEIGHT = 200;
} else {
  HEADER_HEIGHT = screenLessBoardHeight / 2 + 50;
}
const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Utils.size.statusBarHeight,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  statContainer: {
    height: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Utils.colors.themeDarkRed,
  },
  statNumber: {
    fontSize: 25,
    color: Utils.colors.themeLightBlack,
  },
  colorColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    borderColor: Utils.colors.themeDarkGrey,
  },
  colorRow: {
    width: 100,
    height: 50,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorSquare: {
    width: 42,
    height: 42,
    borderRadius: 5,
  },
  footer: {
    height: Utils.size.height - HEADER_HEIGHT - Utils.size.width * Utils.widthHeightRatio,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
});