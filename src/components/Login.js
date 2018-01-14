import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';
// import axios from 'axios';
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
    console.log(`this.state.fbToken ${id}`);
    if ( id !== '' ) {
      console.log('Trying SUBSEQUENT loggin in...')
      fetch(`http://174.138.26.61:8080/api/v1/auth/login?fbToken=${id}`)
           .then(response => response.json())
           .then(function(data) {
              // Create and append the li's to the ul
              console.log('heelo');

            })
           .catch( err => console.error(err) );

      Actions.browsePost();
    } else {
      console.log('Trying INITIAL logging in...')
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1905777919676190', {
        permissions: ['email'],
      });

      try {
        // if no token, then generate one first!
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(response.json())

        await AsyncStorage.setItem('@MyFbToken:key', token);
        // THEN use the token
        fetch(`http://174.138.26.61:8080/api/v1/auth/login?fbToken=${token}`)
             .then(response => console.log(`this is here! ${response}`))
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
