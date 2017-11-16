import React, { Component } from 'react';
import { View } from 'react-native';

import { Container, Content, Text, H3 } from 'native-base';

import SinglePost from './SinglePost';

export default class PostList extends Component {
	async componentWillMount() {
		await this.setState({
			post: this.getAllPosts(),
		})
	}
	getAllPosts(user=null){
		let DATETIME = new Date();
		let postEntries = [
			{_id: "YpsE746PQQh5gG9B9", location: "Woodlands Ave 9", locationDetails: "bawah block", expiryDate: DATETIME, images: [], dietary: ['halal'], description: "not for the diabetic", isFinishing: true, createdAt: DATETIME, updatedAt: DATETIME, posterId: "",  deletedAt: DATETIME },
			{_id: "YpsE746PQQh5aG9B9", location: "Hive @ NTU", locationDetails: "bawah block", expiryDate: DATETIME, images: [], dietary: ['halal'], description: "not for the diabetic", isFinishing: true, createdAt: DATETIME, updatedAt: DATETIME, posterId: "",  deletedAt: DATETIME },
			{_id: "YpsE746PQQh5dG9B9", location: "Grand Hyatt Hotel", locationDetails: "bawah block", expiryDate: DATETIME, images: [], dietary: ['halal'], description: "not for the diabetic", isFinishing: true, createdAt: DATETIME, updatedAt: DATETIME, posterId: "",  deletedAt: DATETIME },
		]

		if (user){
			console.log(`get ONLY current user's posts`);
		} else {
			console.log(`get ALL current user's posts`);
		}

		return postEntries;
	}
	render() {
		posts = this.state.post;
		// console.log(posts)
		return (
			<Content>
				<Text style={{fontWeight: '700', fontSize: 17, marginBottom: 9}}>
					Available Food
				</Text>
				{
					posts.map((post)=>{
						return <SinglePost key={post._id} post={post}/>
					})
				}

			</Content>
		)
	}
}
