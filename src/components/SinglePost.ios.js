import React, { Component } from 'react';
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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

export default class SinglePost extends Component {


	render() {
		const editOrLike = 'create';
		const post = this.props.post;
		// console.log(post.location);
		if (!post){
			return <Button></Button>;
		} else {
			return (
					<Card>
						<CardItem button onPress={Actions.viewPost} cardBody style={{height: 100}}>
							<Image source={require('../../img/nasi-lemak.jpg')} style={{flex: 1}} resizeMode='contain'/>
						</CardItem>
						<CardItem style={{height: 50}}>
							<Body>
								<Grid>
									<Col size={1}>
										<Icon name='md-pin' style={{fontSize: 12, marginTop: 3, color: '#777676'}}/>
									</Col>
									<Col size={11}>
										<Text style={{fontSize: 12, fontWeight: '500', color: '#777676', marginTop: 3}}>
											{post.location}
										</Text>
										<Text style={{fontSize: 9, fontWeight: '500', color: '#999999'}}>
											10 minutes ago
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
