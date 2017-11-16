import React, { Component } from 'react';
import { Alert } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';

import { Actions } from 'react-native-router-flux';

export default class Login extends Component {

  async logIn() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('1773746099600814', {
      permissions: ['public_profile', 'email'],
    });

    try {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      // let responseJson = await response.json().name;
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
      Actions.browsePost();
    } catch(error) {
      console.log(error);
    }
  }

  render() {

    return (
      <SocialIcon
        title='Log In With Facebook'
        button
        type='facebook'
        onPress={this.logIn}
        />
    )
  }
}
