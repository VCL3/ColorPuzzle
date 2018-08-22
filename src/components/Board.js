import React, { Component } from 'react';
import * as Actions from '../actions/index';
import { StyleSheet, Text, View, PanResponder, LayoutAnimation, Alert } from 'react-native';
import ColorEngine from '../engine/ColorEngine';
import Utils from '../utils/Utils'
import tinycolor from 'tinycolor2';

export default class Board extends Component {

  constructor(props) {
    super(props); 
    
    // Tile setup
    const { width, height, colors } = this.props;
    this.width = width;
    this.height = height;
    this.tileWidth = Utils.size.width / width;
    this.tileHeight = Utils.size.width * Utils.widthHeightRatio / height;

    // Initial touch
    this.topIndex = 0;
    this.leftIndex = 0;
    this.index = 0;
    this.top = 0;
    this.left = 0;

    // Final position
    this.finalTopIndex = 0;
    this.finalLeftIndex = 0;
    this.finalIndex = 0;
    this.finalTop = 0;
    this.finalLeft = 0;

    const upperLeft = tinycolor(colors[0]);
    const upperRight = tinycolor(colors[1]);
    const lowerLeft = tinycolor(colors[2]);
    const lowerRight = tinycolor(colors[3]);
    this.colorEngine = new ColorEngine(upperLeft, upperRight, lowerLeft, lowerRight);
    
    this.state = {
      colors: this.colorEngine.currentColorArray,
    };
  }

  componentWillMount() {
    // Initialize PanResponder with move handling
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx !== 0 || gestureState.dx !== 0;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // The gesture has started. Show visual feedback so the user knows what is happening!
      onPanResponderGrant: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        this.topIndex = this.returnTopIndex(pageY);
        this.leftIndex = this.returnLeftIndex(pageX);
        this.index = this.calculateIndexWithTopAndLeft(this.topIndex, this.leftIndex);
        this.top = this.tileHeight * this.topIndex;
        this.left = this.tileWidth * this.leftIndex;
      },
      onPanResponderMove: (evt, gestureState) => {
        this.finalTop = this.top + gestureState.dy;
        this.finalLeft = this.left + gestureState.dx;
        // Move the tile
        let selectedTile = this.refs["tile" + this.index];
        selectedTile.setNativeProps({
          style: {
            top: this.finalTop,
            left: this.finalLeft,
            zIndex: 1,
          },
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // The user has released all touches while this view is the responder. This typically means a gesture has succeeded
      onPanResponderRelease: (evt, gestureState) => this._release(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._release(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });
  } 

  // Return matching index
  returnTopIndex(pageY) {
    return Math.floor((pageY - this.props.headerHeight) / this.tileHeight);
  }

  returnLeftIndex(pageX) {
    return Math.floor((pageX) / this.tileWidth);
  }

  calculateIndexWithXAndY(pageX, pageY) {
    topIndex = this.returnTopIndex(pageY);
    leftIndex = this.returnLeftIndex(pageX);
    return this.calculateIndexWithTopAndLeft(this.topIndex, this.leftIndex);
  }

  calculateIndexWithTopAndLeft(topIndex, leftIndex) {
    return topIndex * this.width + leftIndex;
  }

  _release(evt, gestureState) {
    const shadowStyle = {
      opacity:1,
      shadowColor: "#000",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      }
    };
    this.finalTopIndex = this.returnTopIndex(gestureState.moveY);
    this.finalLeftIndex = this.returnLeftIndex(gestureState.moveX);
    if ((-1 < this.finalTopIndex) && (this.finalTopIndex < this.height) && (-1 < this.finalLeftIndex) && this.finalLeftIndex < this.width) {     
      this.finalIndex = this.calculateIndexWithTopAndLeft(this.finalTopIndex, this.finalLeftIndex);

      // If valid move, swap selected tiles and rerender the board
      if (!(Utils.isBorderTile(this.finalIndex, this.width, this.height) || Utils.isCrossTile(this.finalIndex))) {
        this.colorEngine.currentColorArray[this.index] = this.colorEngine.currentColorArray.splice(this.finalIndex, 1, this.colorEngine.currentColorArray[this.index])[0];
        this.setState({
          colors: this.colorEngine.currentColorArray,
        });
        // Update moves in Game
        this.props.addMove();
      }

      // Reset the moved tile
      let selectedTile = this.refs["tile" + this.index];
      selectedTile.setNativeProps({
        style: {
          top: this.top,
          left: this.left,
          zIndex: 0,
        },
      });

      // Check winning status
      if (this.colorEngine.checkSuccess()) {
        Alert.alert(
          'Win!',
          'You win the game!',
          [
            {text: 'OK', onPress: () => this.props.handleGameWin()},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
          { cancelable: false }
        )
      }
      // LayoutAnimation.configureNext(this.animations);
    } else {
      // console.log(this.topIndex,this.leftIndex)
      // let box = this.refs["box" + this.index];
      // let top = this.topIndex*this.tileWidth;
      // let left = this.leftIndex*this.tileWidth;
      // box.setNativeProps({
      //   style: {top,left,...shadowStyle},
      // });
      // LayoutAnimation.configureNext(this.animations);
    }
  }

  render() {
    const tiles = this.state.colors.map((color, index) => {
      let top = Math.floor(index / this.width) * this.tileHeight;
      let left = (index % this.width) * this.tileWidth;
      let width = this.tileWidth;
      let height = this.tileHeight;
      if (Utils.isBorderTile(index) || Utils.isCrossTile(index)) {
        return (
          <View
            key={index}
            ref={'tile' + index}
            style={[styles.tile, { width, height, top, left, backgroundColor: color.toRgbString() }]}
          >
            <Text>X</Text>
          </View>
        )
      } else {
        return (
          <View
            key={index}
            ref={'tile' + index}
            {...this._panResponder.panHandlers}
            style={[styles.tile, { width, height, top, left, backgroundColor: color.toRgbString() }]}
          />
        );
      }
    })

    return (
      <View style={styles.container}>
        {tiles}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: Utils.size.width,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  tile:{
    zIndex: 0,
    position:"absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});