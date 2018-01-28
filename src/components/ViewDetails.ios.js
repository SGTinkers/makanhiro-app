import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Content, Button, Badge, Left,
  Right, Icon, Card, CardItem,
  Body, Thumbnail } from 'native-base';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { API, POST_PATH, AUTH_TOKEN } from '../util/constants';

export default class ViewDetails extends Component {
  async delete() {
    const headers = {
      Authorization: AUTH_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    fetch(`${API + POST_PATH}?postId=${this.props.post.postId}`, {
      method: 'DELETE',
      headers,
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    const hrsAgo = moment(this.props.post.createdAt).fromNow();
    return (
      <Content padder style={{ backgroundColor: 'white' }}>
        {/* carousel */}
        <Swiper loop={false} height="50%" showsButtons>
          <View>
            <Image source={require('../../img/nasi-lemak.jpg')} />
          </View>
          <View>
            <Image source={require('../../img/nasi-lemak.jpg')} />
          </View>
          <View>
            <Image source={require('../../img/nasi-lemak.jpg')} />
          </View>
        </Swiper>

        {/* Short Description */}
        <Card style={{ flexWrap: 'nowrap' }}>
          <CardItem header>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#89898990' }}>
              Posted { moment(this.props.post.createdAt).fromNow() } by Me
            </Text>
          </CardItem>
          <CardItem style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: '700' }}>{this.props.post.location.locationName}</Text>
            <Text style={{ color: '#2b2929', fontWeight: '500' }}>
              {this.props.post.description}
              {this.props.post.location.locationDetails}
            </Text>
          </CardItem>
          <CardItem footer>
            <Text style={{ color: '#89898990' }}>Contains: </Text>
            <Badge style={{ backgroundColor: '#4de2c2', height: 14, paddingBottom: 15 }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>{this.props.post.dietary}</Text>
            </Badge>
          </CardItem>
        </Card>

        {/* delete button */}
        <View padder style={{ flexDirection: 'row', top: 55 }} >
          <Left />
          <Button onPress={() => Actions.editPost() } rounded style={{ flex: 2, backgroundColor: '#15198c' }}>
            <Body>
              <Text style={{ color: 'white', fontWeight: '600' }} > Edit post </Text>
            </Body>
          </Button>
          <Right />
        </View>
      </Content>
    );
  }
}
