import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Text, View } from 'native-base';
import axios from 'axios';

import SinglePost from './SinglePost';

// import style
import styles from '../styles/MainStyles';
import { API, POST_PATH } from '../util/constants';

export default class MyPost extends Component {
	constructor(props){
    super(props);
    this.state = {
      post: null,
    };
  }

	async componentWillMount() {
		const userId = await AsyncStorage.getItem('@MyUserId:key')
																		 .then( res => res )
																		 .catch( err => console.error(err) );
		console.log(`userId, MyPost ${userId}`);
		const postEntries = await fetch(`${API+POST_PATH}?userId=${userId}`)
														 .then( response => response.json() )
														 .then( res => this.setState({post: res}))
														 .catch( err => console.error(err) );
	}
	async getMyPostOnly(user=null){
		// get userId first!
		const userId = await AsyncStorage.getItem('@MyUserId:key')
																		 .then( res => res )
																		 .catch( err => console.error(err) );
		console.log(`userId, MyPost ${userId}`);
		const postEntries = await fetch(`${API+POST_PATH}`)
														 .then( response => response.json() )
														 .then( res => this.setState({post: res}))
														 .catch( err => console.error(err) );
		console.log('postEntries', this.state.post)
	}
	render() {
		posts = this.state.post;
		console.log(`THIS IS POSTS: ${JSON.stringify(posts)}`);
		if (!posts || posts.length < 1){
			return <View></View>
		}
		return (
			<Content>
				<Text style={styles.yourPostHeading}>
					Your Post
				</Text>
				{
					posts.map((post)=>{
						return <SinglePost key={post.postId} post={post}/>
					})
				}
			</Content>
		)
	}
}
