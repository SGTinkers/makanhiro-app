import React, { Component } from 'react';
import { Content, Text } from 'native-base';

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

		let DATETIME = new Date();

		// Dummy Data ( will make API call )
		let postEntries = [
			{ _id: "YpsE746PQQh5gG9B9",
				location: "Woodlands Ave 9",
				locationDetails: "bawah block",
				expiryDate: DATETIME,
				images: [],
				dietary: ['halal'],
				description: "not for the diabetic",
				isFinishing: true,
				createdAt: DATETIME,
				updatedAt: DATETIME,
				posterId: "",
				deletedAt: DATETIME },
			{ _id: "YpsE746PQQh5aG9B9",
				location: "Hive @ NTU",
				locationDetails: "bawah block",
				expiryDate: DATETIME,
				images: [],
				dietary: ['halal'],
				description: "not for the diabetic",
				isFinishing: true,
				createdAt: DATETIME,
				updatedAt: DATETIME,
				posterId: "",
				deletedAt: DATETIME },
			{ _id: "YpsE746PQQh5dG9B9",
				location: "Grand Hyatt Hotel",
				locationDetails: "bawah block",
				expiryDate: DATETIME,
				images: [],
				dietary: ['halal'],
				description: "not for the diabetic",
				isFinishing: true,
				createdAt: DATETIME,
				updatedAt: DATETIME,
				posterId: "",
				deletedAt: DATETIME },
		]

		return postEntries;
	}
	
	render() {

		posts = this.state.post;
		const { postListHeading } = styles;

		return (
			<Content>
				<Text style={postListHeading}>
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
