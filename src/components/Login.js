import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = { MyFbToken: '' };
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('@MyFbToken:key');
      if (value !== null){
        this.setState({
          MyFbToken: value
        })
        console.log(`line 25: ${this.state.MyFbToken}`);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async logIn(id) {
    if ( id !== '' ) {
      const params = { fbToken: id };
      axios.get(`http://174.138.26.61:8080/api/v1/login?fbToken=${id}`)
           .then(response => console.log(`response ${response}`))
           .catch( err => console.error(err) );

      Actions.browsePost();
    } else {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1773746099600814', {
        permissions: ['public_profile', 'email'],
      });

      try {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(response.json())

        await AsyncStorage.setItem('@MyFbToken:key', token);
        const params = { fbToken: token };
        axios.get('http://174.138.26.61:8080/api/v1/login', params)
             .then(response => console.log(`response ${response}`))
             .catch( err => console.error(err) );;

        Actions.browsePost();
      } catch(error) {
        console.error(error);
      }
    }
  }

  render() {

    return (
      <SocialIcon
        title='Log In With Facebook'
        button
        type='facebook'
        onPress={() => this.logIn(this.state.MyFbToken) }
        />
    )
  }
}
