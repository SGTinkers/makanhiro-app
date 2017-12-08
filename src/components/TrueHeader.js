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

export default class TrueHeader extends Component {

  render() {
    let headTitle = (this.props.header) ? (<Text style={{fontSize: 18}}>{this.props.header}</Text>) : (<Image source={require('../../icon/logo.png')} style={styles.img} resizeMode='contain'/>);
    // let headTitle = (<Text style={{fontSize: 18}}>{this.props.header}</Text>);
    // let headTitle = (<Image source={require('../../icon/logo.png')} style={styles.img} resizeMode='contain'/>);

    // let sm = (this.props.header) ? 'lul' : 'no';
    // console.log(sm)
    let leftIcon = (this.props.header) ? (<Icon button onPress={Actions.pop} name='ios-arrow-back-outline' style={{color: 'black'}}/>) : (<Icon name='menu' style={{color: 'black'}}/>);
    return (
      <Header style={styles.head}>
        <Left>
          <Button transparent>
            {leftIcon}
          </Button>
        </Left>
        <Body style={{flex: 3}}>

        {headTitle}
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
