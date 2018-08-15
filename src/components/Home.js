import React from 'react';
import { View, Text, Button } from 'react-native';
import Utils from '../utils/Utils';
import getLevel from '../Storage';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      level: 0
    }
  }

  componentWillMount() {
    let r = getLevel();
    console.log("RET")
    console.log(r)
    this.setState({
      level: r,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Utils.colors.themeBackgroundColor }}>
        <Text>Color Puzzle</Text>
        <Text>Current Level</Text>
        <Text>{this.state.level}</Text>
        <Button
          title="Start Game"
          onPress={() => this.props.navigation.navigate('Game')}
        />
      </View>
    );
  }
}