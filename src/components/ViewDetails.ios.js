import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  Content,
  Button,
  Badge,
  Left, Right, Icon,
  Card, CardItem, Body,
  Thumbnail } from 'native-base';

import moment from 'moment';

import Swiper from 'react-native-swiper';


const ViewDetails = () => (

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

      <CardItem>
        <Text style={{ color: '#2b2929', fontWeight: '500' }}>
          {this.props.post.description}
        </Text>
      </CardItem>

      <CardItem footer>
        <Badge style={{ backgroundColor: '#4de2c2', height: 14, paddingBottom: 15 }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>{this.props.post.dietary}</Text>
        </Badge>
      </CardItem>
    </Card>

    {/* detailed location */}
    <View padder style={{ flexDirection: 'row', marginTop: '2%' }}>
      <Icon name="md-pin" style={{ fontSize: 13, marginTop: '1%', marginLeft: '1%' }} />
      <Body>
        <Text style={{ color: '#636161', fontSize: 14, textAlign: 'left' }}>
          {this.props.post.location.locationName}
          {this.props.post.location.locationDetails}
        </Text>
      </Body>
    </View>

    {/* map */}
    <View padder style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 60 }}>
      <Left />
      <Button large transparent>
        <Thumbnail large square source={require('../../img/map.png')} style={{ borderRadius: 12, width: '95%', height: 150 }} />
      </Button>
    </View>

    {/* subscribe button */}
    <View padder style={{ flexDirection: 'row', top: 55 }}>
      <Left />
      <Button rounded style={{ flex: 2, backgroundColor: '#f40014' }}>
        <Body>
          <Text style={{ color: 'white', fontWeight: '600' }}>Subscribe</Text>
        </Body>
      </Button>
      <Right />
    </View>

  </Content>
);

module.export = ViewDetails;
