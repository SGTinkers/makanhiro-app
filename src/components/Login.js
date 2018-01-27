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
    this.state = { MyFbToken: '', ServerToken: '' };
  }

  async componentWillMount() {
    try {
      const fbToken = await AsyncStorage.getItem('@MyFbToken:key');
      if (fbToken !== null){
        this.setState({
          MyFbToken: value
        })
        console.log(`MyFbToken: ${this.state.MyFbToken}`);
      }

      const serverToken = await AsyncStorage.getItem('@MyFbToken:serverToken');
      if (serverToken !== null){
        this.setState({
          ServerToken: serverToken
        })
        console.log(`ServerToken: ${this.state.ServerToken}`);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async logIn(id) {
    console.log(`this.state.fbToken ${id}`);
    if ( id !== '' ) {
      console.log('Trying SUBSEQUENT loggin in...')
      fetch(`${API+AUTH_PATH}?fbToken=${id}`)
           .then(response => this.setState( { ServerToken: response._bodyInit.token } ) )
           .catch( err => console.error(err) );

      Actions.browsePost();
    } else {
      console.log('Trying INITIAL logging in...')
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1905777919676190', {
        permissions: ['email'],
      });

      try {
        await AsyncStorage.setItem('@MyFbToken:key', token);

        // THEN use the token
        fetch(`${API+AUTH_PATH}?fbToken=${token}`)
             .then(response => this.setState( { ServerToken: response._bodyInit.token } ) )
             .catch( err => console.error(err) );

        await AsyncStorage.setItem('@MyFbToken:serverToken', this.state.ServerToken );
        // console.log(`JWTTOKEN ${this.state.ServerToken}`);
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
