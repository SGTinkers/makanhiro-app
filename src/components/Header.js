import React, { Component } from 'react';
import { Text, Image, StyleSheet, PixelRatio, AsyncStorage } from 'react-native';
import {
  Header as OldHeader,
  Left,
  Button,
  Icon,
  Body,
  Right,
} from 'native-base';

import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  head: { backgroundColor: 'white', height: (PixelRatio.get() === 2) ? 60 : 100 },
  img: { width: '100%', marginBottom: 10 },
});

export default class Header extends Component {
  static logout() {
    AsyncStorage.removeItem('@MyJwtToken:key');
  }

  render() {
    const headTitle = (this.props.header) ?
      (<Text style={{ fontSize: 18 }}> {this.props.header} </Text>) :
      (<Image source={require('../../icon/logo.png')} style={styles.img} resizeMode="contain" />);

    const leftIcon = (this.props.header) ?
      (<Icon button onPress={Actions.browsePost} name="ios-arrow-back-outline" style={{ color: 'black' }} />) :
      (<Icon name="menu" style={{ color: 'black' }} />);

    return (
      <OldHeader style={styles.head}>
        <Left>
          <Button transparent>
            {leftIcon}
          </Button>
        </Left>
        <Body>
          {headTitle}
        </Body>
        <Right>
          <Button onPress={() => this.logout()} small transparent>
            <Icon ios="ios-notifications-outline" android="md-notifications" style={{ color: 'black' }} />
          </Button>
        </Right>
      </OldHeader>
    );
  }
}
