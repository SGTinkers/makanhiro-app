import React, { Component } from 'react';
import { Container } from 'native-base';
import { AppLoading } from 'expo';
import Router from './src/Router';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({isReady: true})
  }

  render() {
    if (! this.state.isReady)
      return <AppLoading />

    return (
      <Container>
        <Router />
      </Container>
    );
  }
}
