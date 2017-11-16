import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
         Header,
         Left,
         Button,
         Icon,
         Body,
         Right,
      } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class HeadBack extends Component {
  render() {
    return (
      <Header style={styles.head}>
        <Left>
          <Button transparent>
            <Icon button onPress={Actions.pop} name='ios-arrow-back-outline' style={{color: 'black'}}/>
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Image source={require('../../icon/logo.png')} style={styles.img} resizeMode='contain'/>
        </Body>
        <Right>
          <Button small transparent>
            <Icon ios='ios-notifications-outline' android='md-notifications' style={{color: 'black'}}/>
          </Button>
        </Right>
      </Header>
    )

  }
}

const styles = StyleSheet.create({
	head: {backgroundColor: 'white', height: 100},
	img: {width: '100%', marginBottom: 10}
});
