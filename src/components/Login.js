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
    this.state = { MyFbToken: '', jwtToken: '', userId: '' };
  }

  componentWillMount() {
    try {
      console.log('THIS IS LOADED')

      const jwtToken = AsyncStorage.getItem('@MyJwtToken:key');
      if (jwtToken !== null){
        this.setState({ jwtToken });
        Actions.browsePost();
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async logIn() {

      console.log('Trying INITIAL logging in...')
      const { token } = await Facebook.logInWithReadPermissionsAsync('1905777919676190', {
        permissions: ['email'],
      });

      try {
        fetch(`${API+AUTH_PATH}?fbToken=${token}`)
             .then(response => this.setState( { jwtToken: response._bodyInit.token } ) )
             .catch( err => console.error(err) );

        // save jwtToken to AsyncStorage
        await AsyncStorage.setItem('@MyJwtToken:key', this.state.jwtToken );
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
