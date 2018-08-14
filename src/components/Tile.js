import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { Button, SectionList, StyleSheet, Text, View, PanResponder, Animated, LayoutAnimation } from 'react-native';
import Utils from '../utils/Utils';

class Tile extends Component {

  constructor(props) {
    super(props);
    this._width = Utils.size.width / this.props.tileCount;

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
  }

  render() {
    const { color, index } = this.props;
    let top = Math.floor(index / 3) * this._width;
    let left = (index % 3) * this._width;
    // const panStyle = {
    //   transform: this.state.pan.getTranslateTransform()
    // }
    return (
      // <Animated.View
      //   {...this.panResponder.panHandlers}
      //   style={[panStyle, styles.circle]}
      // />
      <View 
        style={[styles.tile, { top, left, backgroundColor: color }]}
      >
        <Text>{index}</Text>
      </View>  
    );
  }
}

function mapStateToProps(state, props) {
  return {
    // movedIndex: state.dataReducer.movedIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);

const WIDTH = Utils.size.width / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile:{
    width: WIDTH,
    height: WIDTH,
    position:"absolute",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: Utils.pixel,
    // borderColor:"#ccc",
  },
})