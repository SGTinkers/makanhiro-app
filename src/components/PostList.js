import React, { Component } from 'react';
import { Content, Text, View } from 'native-base';
import axios from 'axios';

import SinglePost from './SinglePost';

// import style
import styles from '../styles/MainStyles';

export default class PostList extends Component {
	async componentWillMount() {
		await this.setState({
			post: this.getAllPosts(),
		})
	}

	getAllPosts(user=null){

		const postEntries = axios.get('http://174.138.26.61:8080/api/v1/post').then(response => this.setState({post: response.data}))

		// return postEntries;
	}

	render() {
		posts = this.state.post;
		// console.log(`All post: ${posts}`);
		if (!posts){
			return <View></View>
		}
		const { postListHeading } = styles;

		return (
			<Content>
				<Text style={postListHeading}>
					Available Food
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
