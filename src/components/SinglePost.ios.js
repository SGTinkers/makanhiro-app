import React, { Component } from 'react';
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';

import { Button,
		 Card,
		 CardItem,
		 Body,
		 Text,
		 Left,
		 Right,
		 Icon,
		  } from 'native-base';

import { Actions } from 'react-native-router-flux';

// import style
import styles from '../styles/MainStyles';

export default class SinglePost extends Component {


	render() {
		const editOrLike = 'create';
		const post = this.props.post;
		// console.log(post);

		const { pin, location, time } = styles;
		const hrsAgo = moment(this.props.post.createdAt).fromNow();

		if (!post){
			return <Button></Button>;
		} else {
			return (
					<Card>
						<CardItem button onPress={ () => Actions.viewPost({ post })} cardBody style={{height: 100}}>
							<Image source={require('../../img/nasi-lemak.jpg')} style={{flex: 1}} resizeMode='contain'/>
						</CardItem>
						<CardItem style={{height: 50}}>
							<Body>
								<Grid>
									<Col size={1}>
										<Icon name='md-pin' style={pin}/>
									</Col>
									<Col size={11}>
										<Text style={location}>
											{post.location.locationName}
										</Text>
										<Text style={time}>
											{hrsAgo}
										</Text>
									</Col>
								</Grid>
							</Body>

							<Right>
								<Icon button onPress={Actions.editPost} name={editOrLike} style={{color: 'black'}}/>
							</Right>
						</CardItem>
					</Card>
			)
		}

	}
}
