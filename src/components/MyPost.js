import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import SinglePost from './SinglePost';

// import style
import styles from '../styles/MainStyles';

export default class MyPost extends Component {
	async componentWillMount() {
		await this.setState({
			post: this.getMyPostOnly(),
		})
	}
	getMyPostOnly(){

		let DATETIME = new Date();

		// Dummy data (will make API call)
		let postEntries =
			{_id: "YpsE746PQQh5gG9B9",
			location: "Islamic Hub, Braddell Rd",
			locationDetails: "bawah block",
			expiryDate: DATETIME,
			images: [],
			dietary: ['halal'],
			description: "not for the diabetic",
			isFinishing: true,
			createdAt: DATETIME,
			updatedAt: DATETIME,
			posterId: "",
			deletedAt: DATETIME }

		return postEntries;
	}
	render() {
		post = this.state.post;

		return (
			<Content>
				<Text style={styles.yourPostHeading}>
					Your Post
				</Text>
				<SinglePost post={post}/>
			</Content>
		)
	}
}
