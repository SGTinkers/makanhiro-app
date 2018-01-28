import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';
// import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { API, AUTH_PATH } from '../util/constants';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = { jwtToken: null, userId: null };
  }

  componentWillMount() {
    try {
      console.log('THIS IS LOADED')

      const jwtToken = AsyncStorage.getItem('@MyJwtToken:key')
                                   .then( res => this.setState({ jwtToken: res }) )
      // console.log(`jwtToken ${JSON.stringify(jwtToken)}`);
      if (this.state.jwtToken !== null){
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
        await fetch(`${API+AUTH_PATH}?fbToken=${token}`)
             .then( response => response.json() )
             .then( res => {
               AsyncStorage.setItem('@MyJwtToken:key', res.token)
               return this.setState({ jwtToken: res.token, userId: res.userId })
             } )
             .catch( err => console.error(err) );

        Actions.browsePost();
      } catch(error) {
        console.error(error);
      }
  }

  render() {

    return (
      <SocialIcon
        title='Log In With Facebook'
        button
        type='facebook'
        onPress={ () => this.logIn() }
        />
    )
  }
}
