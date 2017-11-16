import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, PixelRatio } from 'react-native';
import {
         Header,
         Left,
         Button,
         Icon,
         Body,
         Right,
      } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class CreatePostHeader extends Component {
  render() {

    return (
      <Header style={styles.head}>
        <Left>
          <Button transparent>
            <Icon button onPress={Actions.pop} name='ios-arrow-back-outline' style={{color: 'black'}}/>
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Text style={{fontSize: 18}}>Edit a Post</Text>
        </Body>
        <Right />

      </Header>
    )

  }
}

const styles = StyleSheet.create({
	head: {backgroundColor: 'white', height: (PixelRatio.get() === 2) ? 65 : 95},
	img: {width: '100%', marginBottom: 10}
});
