import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { Button, SectionList, StyleSheet, Text, View, PanResponder, LayoutAnimation, Alert } from 'react-native';
import Tile from './Tile';
import Utils from '../utils/Utils'
import ColorEngine from '../utils/ColorEngine';
import tinycolor from 'tinycolor2';

class Board extends Component {

  constructor(props) {
    super(props);
    this._width = Utils.size.width / Utils.tileCount;

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

    const upperLeft = tinycolor("rgb 188 69 68");
    const upperRight = tinycolor("rgb 89 175 241");
    const lowerLeft = tinycolor("rgb 242 196 108");
    const lowerRight = tinycolor("rgb 243 243 243");
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
        this.top = this._width * this.topIndex;
        this.left = this._width * this.leftIndex;
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
    return Math.floor((pageY - this.props.headerHeight) / this._width);
  }

  returnLeftIndex(pageX) {
    return Math.floor((pageX) / this._width);
  }

  calculateIndexWithXAndY(pageX, pageY) {
    topIndex = this.returnTopIndex(pageY);
    leftIndex = this.returnLeftIndex(pageX);
    return this.calculateIndexWithTopAndLeft(this.topIndex, this.leftIndex);
  }

  calculateIndexWithTopAndLeft(topIndex, leftIndex) {
    return topIndex * Utils.tileCount + leftIndex;
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
    if ((-1 < this.finalTopIndex) && (this.finalTopIndex < Utils.tileCount) && (-1 < this.finalLeftIndex) && this.finalLeftIndex < Utils.tileCount) {     
      this.finalIndex = this.calculateIndexWithTopAndLeft(this.finalTopIndex, this.finalLeftIndex);

      // If valid move, swap selected tiles and rerender the board
      if (!(Utils.isBorderTile(this.finalIndex) || Utils.isCrossTile(this.finalIndex))) {
        this.colorEngine.currentColorArray[this.index] = this.colorEngine.currentColorArray.splice(this.finalIndex, 1, this.colorEngine.currentColorArray[this.index])[0];
        this.setState({
          colors: this.colorEngine.currentColorArray,
        });
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
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
          { cancelable: false }
        )
      }
      // LayoutAnimation.configureNext(this.animations);
    } else {
      // console.log(this.topIndex,this.leftIndex)
      // let box = this.refs["box" + this.index];
      // let top = this.topIndex*this._width;
      // let left = this.leftIndex*this._width;
      // box.setNativeProps({
      //   style: {top,left,...shadowStyle},
      // });
      // LayoutAnimation.configureNext(this.animations);
    }
  }

  render() {
    const tiles = this.state.colors.map((color, index) => {
      let top = Math.floor(index / Utils.tileCount) * this._width;
      let left = (index % Utils.tileCount) * this._width;
      if (Utils.isBorderTile(index) || Utils.isCrossTile(index)) {
        return (
          <View
            key={index}
            ref={'tile' + index}
            style={[styles.tile, { top, left, backgroundColor: color.toRgbString() }]}
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
            style={[styles.tile, { top, left, backgroundColor: color }]}
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

// Map the state of the redux store to the component props
function mapStateToProps(state, props) {
  return {
    colors: state.indexReducer.colors,
    movedIndex: state.indexReducer.movedIndex,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

const WIDTH = Utils.size.width / Utils.tileCount;
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: Utils.size.width,
    backgroundColor: Utils.colors.themeBackgroundColor,
  },
  tile:{
    width: WIDTH,
    height: WIDTH,
    zIndex: 0,
    position:"absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});