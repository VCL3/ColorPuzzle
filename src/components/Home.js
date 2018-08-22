import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Utils from '../utils/Utils';
import getLevel from '../Storage';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const { highestLevel, gameLevel, setLevel } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Utils.colors.themeBackgroundColor }}>
        <Text>Highest Level</Text>
        <Text>{highestLevel}</Text>
        <Text>Current Level</Text>
        <Text>{gameLevel}</Text>
        <Button
          title="Start Game"
          onPress={() => this.props.navigation.navigate('Game', {
            currentLevel: gameLevel,
          })}
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
    setLevel: () => {
      dispatch({
        type: 'SET_LEVEL',
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);