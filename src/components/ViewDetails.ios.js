import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Container,
				 Content,
				 Button,
				 Badge,
			   Left, Right, Icon,
			   Card, CardItem, Body,
			   Thumbnail } from 'native-base';

import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import MyPost from './MyPost';
import PostList from './PostList';

export default class ViewPost extends Component {
	render() {
			const { main, carousel, sDesc, location, subscribe } = styles;
		return (
				<Container>
					<Content padder style={{backgroundColor: 'white'}}>
					<View>
						{/* carousell */}

						<Swiper loop={false} height={'50%'} showsButtons={true}>
							<View>
								<Image source={require('../../img/nasi-lemak.jpg')} />
							</View>
							<View>
							<Image source={require('../../img/nasi-lemak.jpg')} />

							</View>
							<View>
							<Image source={require('../../img/nasi-lemak.jpg')} />
							</View>
						</Swiper>

						{/* Short Description */}
						<Card style={{height: 155, flex: 1, flexWrap: 'nowrap'}}>
							<CardItem header>
								<Text style={{fontSize: 12, fontWeight: '500', color: '#89898990'}}>Posted 10 minutes ago by Me</Text>
							</CardItem>
							<CardItem>

								<Text style={{color: '#2b2929', fontWeight: '500'}}>We have loads of nasi lemak left over! Come quick. In general, short description of food goes here</Text>

							</CardItem>
							<CardItem footer>
								<Badge style={{ backgroundColor: '#4de2c2', height: 14, paddingBottom: 15}}>
									<Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>Contain Nuts</Text>
								</Badge>
							</CardItem>
						</Card>

						{/* detailed location */}
						<View padder style={{flex: 1, flexDirection: 'row', marginTop: 11}}>

							{/* <Text style={{color: '#636161', fontSize: 14, textAlign: 'left'}}>
							&nbsp;&nbsp;
							<Icon name='md-pin' style={{flex: 1, fontSize: 15}}/>
								&nbsp;&nbsp;&nbsp;Block 358 Woodlands Ave 5 #03-374 Singapore 730358
							</Text>*/}

							<Icon name='md-pin' style={{fontSize: 15, marginTop: 1}}/>

							<Body>
							<Text style={{color: '#636161', fontSize: 15, textAlign: 'left'}}>
								Block 358 Woodlands Ave 5 #03-374 Singapore 730358
							</Text>
							</Body>

						</View>
						{/* map */}
						<View padder style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 60}}>
							<Left />
							<Button large transparent>
								<Thumbnail large square source={require('../../img/map.png')} style={{borderRadius: 12, width: '95%', height: 150}}/>
							</Button>
						</View>

						{/* subscribe button */}

						<View padder style={{flex: 1, flexDirection: 'row', position: 'relative', top: 55}}>
							<Left />
							<Button rounded style={{flex: 2, backgroundColor: '#f40014'}}>
								<Body>
									<Text style={{color: 'white', fontWeight: '600'}}>Subscribe</Text>
								</Body>
							</Button>
							<Right />
						</View>

					</View>
					</Content>
				</Container>
		)
	}
}


const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
	},
	carousel: {
		flex: 1,
	},
	sDesc: {
		flex: 1
	},
	location: {
		flex: 1
	},
	subscribe: {
		flex: 1
	},
})
