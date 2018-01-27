import React, { Component } from 'react';
import { PixelRatio, DatePickerIOS } from 'react-native';
import { ImagePicker } from 'expo';
import CheckBox from 'react-native-checkbox';
import moment from 'moment';
import { Form, Container, Content,
  Item as Piece, Input, Button,
  Text, Thumbnail, Right,
  Left, View, Picker, Icon } from 'native-base';

import { API, POST_PATH, AUTH_TOKEN } from '../util/constants';

const { Item } = Picker;

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodAvailability: '',
      image: [],
      imageObj: [],
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
  onFoodAvailabilityChange(value: string) {
    this.setState({
      foodAvailability: value
    });
  }
  onLocationSelectedChange(value: number) {
    this.setState({
      locationSelected: value
    });
  }

  getJustImgName(img) {
		// console.log(`HI im img: ${img}`);
    const fullUri = img.split('/');
    const justUri = fullUri[fullUri.length - 1];

    return justUri;
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

		// console.log(result);

    if (!result.cancelled) {
      let currImg = this.state.image;
      currImg.push(result.uri);
      let imgObjArray = this.state.imageObj;
      imgObjArray.push(result);
      this.setState({ image: currImg, imageObj: imgObjArray });
    }
  };

  post() {

    let formData = new FormData();

  // config headers
		const headers = { 'Content-Type': 'multipart/form-data',
										 	'Authorization': AUTH_TOKEN,
											};
		const { locationSelected,
            image,
						dietaryRestriction,
						foodAvailability,
						description,
						imageObj } = this.state;

		// console.log('IMAGEOBJ', imageObj);
		// dd-MM-yyyy hh:mm:ss
    const params = {
      locationId: locationSelected,
      expiryTime: moment(this.state.date).format('DD-MM-yyyy hh:mm:ss'),
      images: image.map( img => this.getJustImgName(img) ),
      dietary: dietaryRestriction[0],
      description,
      foodAvailability,
    }
    console.log(params);
    formData.append('data', JSON.stringify(params));
    imageObj.map( (eachImg, index) => formData.append(`img${index}`, {
      uri: eachImg.uri,
      type: 'image/jpeg',
      name: this.getJustImgName(image[index]),
    }) );

    fetch(API + POST_PATH, {
      method: 'POST',
      headers,
      body: formData
    })
    .then( res => console.log(res) )
		.catch( err => console.error(err) )
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
           { image.length < 3 ? (<Button large transparent style={{marginRight: 10}}
             onPress={this._pickImage} >
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
									onValueChange={this.onLocationSelectedChange.bind(this)}
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
		              onValueChange={this.onFoodAvailabilityChange.bind(this)}
									>

									<Item label="A lot!" value="ABUNDANT"/>
									<Item label="Finishing soon" value="FINISHING" />
									<Item label="Finished" value="FINISHED" />
								</Picker>

								{/* expiryTime */}
								<View style={{ flexDirection: 'row' }} >
									<Icon style={{ alignSelf: 'flex-start', fontSize: 27, marginRight: 6 }} active name='ios-calendar-outline' />
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
										// console.log('I am checked', this.state.dietaryRestriction)
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
									// console.log('I am checked', this.state.dietaryRestriction)
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
