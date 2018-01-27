import React, { Component } from 'react';
import { PixelRatio, DatePickerAndroid, TimePickerAndroid, Keyboard } from 'react-native';

import { Form,
				 Container,
				 Content,
				 Header,
				 Item as Piece,
				 Input,
				 Button,
				 Text,
				 Thumbnail,
				 Badge,
				 Right,
				 Body,
				 Left,
				 View, Picker, Icon } from 'native-base';

import { ImagePicker } from 'expo';
import CheckBox from 'react-native-checkbox';
import moment from 'moment';
import axios from 'axios';

import { API, POST_PATH } from '../util/constants';

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6Ik1zb2NpZXR5IiwiaWQiOiJkYTQ0OGJmMWQ2YzJjNThkMWNmMDhlZGIzOWI0ZmEyOGI3MWRkZDhlYzRkNWY2NTkyODdhOGRiMWZmOTU1OTRkIiwiZW1haWwiOiJnaG9zdG9wczFAaG90bWFpbC5zZyJ9.scztzqjm3z9fAyTQwc1_JBGjZMsk8aQRKzF61Cgy0xA';
const Item = Picker.Item;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodAvailability: '',
			image: [],
			date: new Date(),
			fullDateObj: {
				year: '',
				month: '',
				day: '',
				hour: '',
				minute: '',
			},
			dietaryRestriction: [],
			locationSelected: undefined,
			checkDiet: {
				halal: false,
				veg: false,
			},
			description: '',
		};
	}
	onValueChange5(value: string) {
		this.setState({
			foodAvailability: value
		});
	}
	onValueChange6(value: number) {
		this.setState({
			locationSelected: value
		});
	}
	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		console.log(result);

		if (!result.cancelled) {
			let currImg = this.state.image;
			currImg.push(result.uri)
			this.setState({ image: currImg });
		}
	};
	post() {
		const { locationSelected, image, dietaryRestriction, foodAvailability, description } = this.state;
		const params = {
			locationId: locationSelected,
			expiryTime: moment(this.state.date).format('DD-MM-YYYY hh:mm:ss'),
			images: image,
			dietary: dietaryRestriction[0],
			description,
			foodAvailability,
		}
		// console.log(params);
		axios.post(API + POST_PATH, params)
		.then(function (response) {
			console.log('lalala');
			console.log(response);
		})
		.catch(function (error) {
			// console.error(error.response.data);
			console.error(error);
		});
	}
	async renderAndroidDatePicker() {
		try {
		  const {action, year, month, day} = await DatePickerAndroid.open({
		    // Use `new Date()` for current date.
		    // May 25 2020. Month 0 is January.
		    date: new Date()
		  });
		  if (action !== DatePickerAndroid.dismissedAction) {
		    // Selected year, month (0-11), day
				let { hour, minute } = this.state.fullDateObj;
				let date = new Date(year, month, day, hour, minute);
				// let date =  new Date(year, month, day);
				this.setState({ fullDateObj: { year, month, day, hour, minute }, date });
		  }
		} catch ({code, message}) {
  		console.warn('Cannot open date picker', message);
		}
	}

	async renderTimePickerAndroid() {
		try {
		  const {action, hour, minute} = await TimePickerAndroid.open({
		    hour: 14,
		    minute: 0,
		    is24Hour: false, // Will display '2 PM'
		  });
		  if (action !== TimePickerAndroid.dismissedAction) {
		    // Selected hour (0-23), minute (0-59)
				let { year, month, day } = this.state.fullDateObj;
				let date = new Date(year, month, day, hour, minute);

				this.setState({ fullDateObj: { year, month, day, hour, minute }, date });
		  }
		} catch ({code, message}) {
		  console.warn('Cannot open time picker', message);
		}
	}
	render() {
		console.log(this.state.date);
		//Wed Jan 10 2018 17:08:04 GMT+0800 (+08) new Date() format
		let { image } = this.state;
		let { dietaryRestriction } = this.state;
		return (
	      <Container>
	        <Content padder style={{backgroundColor: '#f7f7f7'}}>
						{/* upload images */}
						<View style={{flexDirection: 'row', marginTop: 20, marginBottom: 13, marginLeft: 10}}>
							{ image.length < 3 ? (<Button large transparent style={{marginRight: 10, height: 80}} onPress={this._pickImage} >
																	<Thumbnail large square source={require('../../icon/add-photo.png')} style={{borderRadius: 20}}/>
																</Button>) : <View></View>}

							{
								image.map( eachImageUri => <Button key={ eachImageUri } large transparent style={{marginRight: 10, height: 80}}>
																	<Thumbnail large square source={{ uri: eachImageUri }} style={{borderRadius: 12}}/>
																</Button> )
							}
						</View>
						<View style={{flexDirection: 'row', marginLeft: 10}} >
							<Icon style={{fontSize: 15, marginRight: 3}} name='information-circle' />
							<Text style={{alignSelf: 'flex-start', fontStyle: 'italic', fontSize: 10 }}>maximum of 3 photos.</Text>
						</View>

						{/* form input */}
						<View style={{marginTop: 10}}>
							<Form style={{padding: 10}}>

								{/* description */}
								<Piece rounded style={{padding: 5, marginBottom: 23}}>
									<Input onChangeText={ (description) => {this.setState({ description })} } onfloatingLabel multiline={true} numberOfLines={3} placeholder='Short description of food' style={{height: 100, fontSize: 13}}/>
								</Piece>

								<Picker textStyle={{fontSize: 11}} style={{alignSelf: 'stretch', marginBottom: 20, borderRadius: 20, borderWidth: 0.5, borderColor: '#d6d7da'}}
									mode="dropdown"
									placeholder="Select Location"
									headerStyle={{ backgroundColor: "#b95dd3" }}
									headerBackButtonTextStyle={{ color: "#fff" }}
									headerTitleStyle={{ color: "#fff" }}
									selectedValue={this.state.locationSelected}
									onValueChange={this.onValueChange6.bind(this)}
									>

									<Item label="National University of Singapore" value={0} />
									<Item label="Nanyang Technological University" value={1} />
									<Item label="Singapore Management University" value={2} />
									<Item label="Temasek Polytechnic" value={7} />
									<Item label="Singapore Polytechnic" value={3} />
									<Item label="Republic Polytechnic" value={4} />
									<Item label="Ngee Ann Polytechnic" value={6} />
									<Item label="Nanyang Polytechnic" value={5} />
								</Picker>

								{/* food availability */}
								<Picker textStyle={{fontSize: 11}} style={{alignSelf: 'stretch', marginBottom: 20, borderRadius: 20, borderWidth: 0.5, borderColor: '#d6d7da'}}
									mode="dropdown"
									placeholder="Select Food Availability"
									headerStyle={{ backgroundColor: "#b95dd3" }}
									headerBackButtonTextStyle={{ color: "#fff" }}
									headerTitleStyle={{ color: "#fff" }}
									selectedValue={this.state.foodAvailability}
		              onValueChange={this.onValueChange5.bind(this)}
									>

									<Item label="A lot!" value="ABUNDANT"/>
									<Item label="Finishing soon" value="FINISHING" />
									<Item label="Finished" value="FINISHED" />
								</Picker>

								{/* expiryTime */}
								<View style={{ flexDirection: 'row' }} >
									<Icon style={{ alignSelf: 'center', fontSize: 27, marginRight: 6 }} active name='ios-calendar-outline' />
									{/*										<Button
																				onPress={ () => this.renderAndroidDatePicker() }
																			 	style={{ height: 30 }}
																				block
																				bordered
																				danger>
														            <Text>Set Expiry Date</Text>
														          </Button>
																			<Text
																				style={{ fontStyle: 'italic', fontSize: 10 }}>
																				expired at: <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
																				{moment(this.state.date).format('DD-MMM-YYYY hh:mm A')}
																				</Text>
																			</Text>  */}
									<Button onPress={ () => this.renderAndroidDatePicker() } bordered info>
			            	<Text>{moment(this.state.date).format('DD-MMM-YYYY')}</Text>
			          	</Button>
									<Icon style={{ alignSelf: 'center', fontSize: 27, marginLeft: 10, marginRight: 6 }} active name='ios-time-outline' />
									<Button onPress={ () => this.renderTimePickerAndroid() } bordered info>
										<Text>{moment(this.state.date).format('hh:mm A')}</Text>
									</Button>
								</View>
								<View style={{flexDirection: 'row'}}>
									<Icon style={{fontSize: 15, marginRight: 3}} name='information-circle' />
									<Text
										style={{ fontStyle: 'italic', fontSize: 10 }}>
										set expiry: <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
										date/time
										</Text>
									</Text>
								</View>

							</Form>
						</View>

						{/* Dietary Restriction */}
						<View padder style={{marginBottom: (PixelRatio.get() === 2) ? 50 : 150}}>
							<CheckBox
							  label='Halal'
							  checked={this.state.checkDiet.halal}
							  onChange={(checked) => {
										// toggle state
										this.setState({  checkDiet: {
											halal: !this.state.checkDiet.halal,
											veg: this.state.checkDiet.veg,
										} });
										if (! dietaryRestriction.includes('HALAL')){
											dietaryRestriction.push('HALAL');
											this.setState({ dietaryRestriction })
										} else {
											const index = dietaryRestriction.indexOf('HALAL');
											dietaryRestriction.splice(index, 1);
											this.setState({ dietaryRestriction })
										}
										console.log('I am checked', this.state.dietaryRestriction)
									}}
							/>
							<CheckBox
							  label='Vegetarian'
							  checked={this.state.checkDiet.veg}
							  onChange={(checked) => {
									// toggle state
									this.setState({  checkDiet: {
										halal: this.state.checkDiet.halal,
										veg: !this.state.checkDiet.veg,
									} });
									if (! dietaryRestriction.includes('VEGETARIAN')){
										dietaryRestriction.push('VEGETARIAN');
										this.setState({ dietaryRestriction })
									} else {
										const index = dietaryRestriction.indexOf('VEGETARIAN');
										dietaryRestriction.splice(index, 1);
										this.setState({ dietaryRestriction })
									}
									console.log('I am checked', this.state.dietaryRestriction)
									}}
							/>
            </View>

						{/* Submit Button */}
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
							<Left />
							<Button onPress={ () => this.post() } iconRight rounded style={{backgroundColor: '#c517d8', flex: 2}}>
								<Text>Post</Text>
								<Icon name='checkmark' />
							</Button>
							<Right />
						</View>
	        </Content>
	      </Container>
		)
	}
}

export default CreatePost;
