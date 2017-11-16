import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Button, Fab, Icon, Right } from 'native-base';

import { Actions } from 'react-native-router-flux';

import MyPost from './MyPost';
import PostList from './PostList';

export default class BrowsePost extends Component {
	constructor(){
		super();
		this.state = {
			active: false,
		}
	}
	render() {
		return (

			<Container>
				<Content padder style={{backgroundColor: 'white'}}>

					<MyPost />
					<PostList />


				</Content>
					<Button onPress={Actions.createPost} iconLeft rounded style={{paddingRight: 19, width: '40%', position: 'absolute', alignSelf: 'center', bottom: 53, backgroundColor: '#c517d8'}}>
						<Icon name='md-add' />
						<Text style={{color: 'white', fontWeight: '700'}}>Create a Post</Text>
					</Button>

				</Container>

		)
	}
}
