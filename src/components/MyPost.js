import React, { Component } from 'react';
import { Container, Content, Text, View } from 'native-base';
import axios from 'axios';

import SinglePost from './SinglePost';

// import style
import styles from '../styles/MainStyles';

export default class MyPost extends Component {
	async componentWillMount() {
		await this.setState({
			post: this.getMyPostOnly(),
		})
	}
	getMyPostOnly(user=null){

		const postEntries = axios.get('http://174.138.26.61:8080/api/v1/post').then(response => this.setState({post: response.data}))

		// return postEntries;
	}
	render() {
		posts = this.state.post;
		if (!posts){
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
