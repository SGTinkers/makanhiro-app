import React, { Component } from 'react';
import { AsyncStorage, View, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';
// import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { API, AUTH_PATH } from '../util/constants';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { jwtToken: null };
  }

  componentWillMount() {
    try {
      const jwtToken = AsyncStorage.getItem('@MyJwtToken:key')
        .then(res => this.setState({ jwtToken: res }));
      // console.log(`jwtToken ${JSON.stringify(jwtToken)}`);
      if (this.state.jwtToken !== null) {
        this.setState({ jwtToken });
        Actions.browsePost();
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async logIn() {
    const { token } = await Facebook.logInWithReadPermissionsAsync('1905777919676190', {
      permissions: ['email'],
    });

    try {
      await fetch(`${API + AUTH_PATH}?fbToken=${token}`)
        .then(response => response.json())
        .then((res) => {
          AsyncStorage.setItem('@MyJwtToken:key', res.token);
          return this.setState({ jwtToken: res.token });
        })
        .catch(err => console.error(err));
      Actions.browsePost();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 50 }}>
        <Image source={require('../../img/makanhiro.png')} style={{ flex: 2, alignSelf: 'center' }} resizeMode="contain" />
        <View style={{ flex: 1, marginTop: 50 }}>
          <SocialIcon
            title="Log In With Facebook"
            button
            type="facebook"
            onPress={() => this.logIn()}
          />
        </View>
      </View>
    );
  }
}
