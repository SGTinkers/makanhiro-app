import React, { Component } from 'react';
import { PixelRatio, DatePickerIOS, Keyboard } from 'react-native';

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
			showDatePicker: false,
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
	handleDietaryToggle() {
		//get text Content
		//check if inside state (array)

		//if not inside,
		//push to array,

		//if inside,
		//remove frm array

	}
	renderDietaryToggle() {
		//if state.dietaryRestriction contains a 'halal'
		//should look 'without the tick, less color'

		//if state.dietaryRestriction contains a 'vegan'
		//should look 'without the tick, less color'
	}
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
		axios.post('https://174.138.26.61:8080/api/v1/post', params)
		.then(function (response) {
			console.log('lalala');
			console.log(response);
		})
		.catch(function (error) {
			// console.error(error.response.data);
			console.error(error);
		});
	}
	render() {
		let { image } = this.state;
		let { dietaryRestriction } = this.state;
		let showDatePicker = this.state.showDatePicker ?
			<DatePickerIOS
				style={{ height: 200 }}
				date={this.state.date} onDateChange={ (date) => this.setState({date}) }
				mode="datetime" /> : <View />;
		return (
	      <Container>
	        <Content padder style={{backgroundColor: '#f7f7f7'}}>
						{/* upload images */}
						<View style={{flexDirection: 'row', marginTop: 20, marginBottom: 13, marginLeft: 10}}>
							{ image.length < 3 ? (<Button large transparent style={{marginRight: 10}} onPress={this._pickImage} >
																	<Thumbnail large square source={require('../../icon/add-photo.png')} style={{borderRadius: 12}}/>
																</Button>) : <View></View>}

							{
								image.map( eachImageUri => <Button key={ eachImageUri } large transparent style={{marginRight: 10}}>
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
									<Icon style={{ alignSelf: 'flex-start', fontSize: 27, marginRight: 6 }} active name='ios-calendar-outline' />
									{/*									<Input
																			value={moment(this.state.date).format('DD-MMM-YYYY hh:mm A')}
																			onFocus={ () => {
																				Keyboard.dismiss;
																				this.setState({showDatePicker: !this.state.showDatePicker})
																			} }
																			style={{fontSize: 13}}
																			placeholder='expiry date'/>  */}
									<View style={{ flexDirection: 'column', flex: 1 }}>
										<Button
											onPress={ () => this.setState({ showDatePicker: !this.state.showDatePicker }) }
										 	style={{ height: 30 }}
											block
											bordered
											danger>
					            <Text>{ this.state.showDatePicker ? 'Set!': 'Set Expiry Date' }</Text>
					          </Button>
										<Text
											style={{ fontStyle: 'italic', fontSize: 10 }}>
											expired at: <Text style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
											{moment(this.state.date).format('DD-MMM-YYYY hh:mm A')}
											</Text>
										</Text>
									</View>
								</View>

								{showDatePicker}

							</Form>
						</View>

						{/* Dietary Restriction */}
						<View padder style={{marginBottom: (PixelRatio.get() === 2) ? 50 : 150}}>
              {/* <Button onPress={ () => console.log('add restriction') } iconLeft small transparent>
                <Icon name='md-add-circle' style={{color: '#4de2c2', fontSize: 30}}/>
							</Button>
							<Button onPress={this.handleDietaryToggle.bind(this)} small transparent>
								<Badge style={{ backgroundColor: '#4de2c2', marginLeft: 5, height: '129%', alignSelf: 'center'}}>
									<Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>Halal</Text>
								</Badge>
							</Button>
							<Button onPress={this.handleDietaryToggle.bind(this)} small transparent>
								<Badge style={{ backgroundColor: '#4de2c2', marginLeft: 5, height: '129%', alignSelf: 'center'}}>
									<Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>Vegetarian</Text>
								</Badge>
							</Button> */}

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
