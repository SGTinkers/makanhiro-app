import React, { Component } from 'react';
import { PixelRatio, DatePickerIOS } from 'react-native';
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

import moment from 'moment';

const Item = Picker.Item;

class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected5: "ABUNDANT",
			image: [],
			date: new Date(),
			showDatePicker: false,
			dietary: ['HALAL', 'Vegan'],
		};
	}
	onValueChange5(value: string) {
		this.setState({
			selected5: value
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

	render() {
		let { image } = this.state;
		// const posterId = 'da448bf1d6c2c58d1cf08edb39b4fa28b71ddd8ec4d5f659287a8db1ff95594d';
		let showDatePicker = this.state.showDatePicker ?
			<DatePickerIOS
				style={{ height: 150 }}
				date={this.state.date} onDateChange={ (date) => this.setState({date}) }
				mode="datetime" /> : <View />;
		return (
	      <Container>
	        <Content padder style={{backgroundColor: '#f7f7f7'}}>
						{/* upload images */}
						<View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
							{ image.length < 3 ? (<Button large transparent style={{marginRight: 10}} onPress={this._pickImage} >
																	<Thumbnail large square source={require('../../icon/add-photo.png')} style={{borderRadius: 12}}/>
																</Button>) : <View></View>}

							{
								image.map( eachImageUri => <Button key={ eachImageUri } large transparent style={{marginRight: 10}}>
																	<Thumbnail large square source={{ uri: eachImageUri }} style={{borderRadius: 12}}/>
																</Button> )
							}
						</View>

						{/* form input */}
						<View style={{marginTop: 30}}>
							<Form style={{padding: 10}}>

								{/* description */}
								<Piece rounded style={{padding: 5, marginBottom: 23}}>
									<Input floatingLabel multiline={true} numberOfLines={3} placeholder='Short description of food' style={{height: 100, fontSize: 13}}/>
								</Piece>

								{/* location */}
								<Piece rounded style={{padding: 5, marginBottom: 23}}>
									<Input placeholder='Location' style={{fontSize: 11, height: 25}}/>
								</Piece>

								{/* food availability */}
								<Picker textStyle={{fontSize: 11}} style={{alignSelf: 'stretch', marginBottom: 20, borderRadius: 20, borderWidth: 0.5, borderColor: '#d6d7da'}}
									mode="dropdown"
									headerStyle={{ backgroundColor: "#b95dd3" }}
									headerBackButtonTextStyle={{ color: "#fff" }}
									headerTitleStyle={{ color: "#fff" }}
									selectedValue={this.state.selected5}
		              onValueChange={this.onValueChange5.bind(this)}
									>

									<Item label="A lot!" value="ABUNDANT"/>
									<Item label="Finishing soon" value="FINISHING" />
									<Item label="Finished" value="FINISHED" />
								</Picker>

								{/* expiryTime */}
								<Piece>
									<Icon style={{fontSize: 16}} active name='ios-calendar-outline' />
									<Input
										value={moment(this.state.date).format('DD-MMM-YYYY hh:mm A')}
										onFocus={ () => this.setState({showDatePicker: !this.state.showDatePicker}) }
										style={{fontSize: 13}}
										placeholder='expiry date'/>
								</Piece>
								{showDatePicker}

							</Form>
						</View>

						{/* Dietary Restriction */}
						<View padder style={{flexDirection: 'row', marginBottom: (PixelRatio.get() === 2) ? 50 : 150}}>
              <Button iconLeft small transparent>
                <Icon name='md-add-circle' style={{color: '#4de2c2', fontSize: 30}}/>
							</Button>
								{ this.state.dietary.length < 1 ?
									(<Text style={{color: '#4de2c2', fontWeight: '600', alignSelf: 'flex-start'}}>Add Dietary Restriction</Text>) : (<View />)}

								{ this.state.dietary.map( diet => <Badge style={{ backgroundColor: '#4de2c2', marginLeft: 5, height: '76%', alignSelf: 'center'}}>
								                  <Text style={{ color: 'white', fontSize: 10, alignSelf: 'center' }}>{ diet }</Text>
								                </Badge> ) }
            </View>

						{/* Submit Button */}
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
							<Left />
							<Button iconRight rounded style={{backgroundColor: '#c517d8', flex: 2}}>
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
