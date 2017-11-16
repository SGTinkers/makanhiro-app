import React, { Component } from 'react';
import { PixelRatio } from 'react-native';
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

 const Item = Picker.Item;

class CreatePost extends Component {
	constructor(props) {
	super(props);
	this.state = {
		selected5: "key2"
	};
}
onValueChange5(value: string) {
	this.setState({
		selected5: value
	});
}
	render() {
		return (
	      <Container>
	        <Content padder style={{backgroundColor: '#f7f7f7'}}>
						{/* photos */}
						<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 10}}>

							<Button large transparent style={{marginRight: 10}}>
								<Thumbnail large square source={require('../../icon/add-photo.png')} style={{borderRadius: 12}}/>
							</Button>
						</View>

						{/* form input */}
						<View style={{marginTop: 30}}>
							<Form style={{padding: 10}}>
								<Piece rounded style={{padding: 5, marginBottom: 23}}>
									<Input floatingLabel multiline={true} numberOfLines={3} placeholder='Short description of food' style={{height: 100, fontSize: 13}}/>
								</Piece>
								<Piece rounded style={{padding: 5, marginBottom: 23}}>
									<Input placeholder='Location' style={{fontSize: 11, height: 25}}/>
								</Piece>

								<Picker textStyle={{fontSize: 11}} style={{alignSelf: 'stretch', marginBottom: 20, borderRadius: 20, borderWidth: 0.5, borderColor: '#d6d7da'}}
									mode="dropdown"
									headerStyle={{ backgroundColor: "#b95dd3" }}
									headerBackButtonTextStyle={{ color: "#fff" }}
									headerTitleStyle={{ color: "#fff" }}
									selectedValue={this.state.selected5}
		              onValueChange={this.onValueChange5.bind(this)}
									>

									<Item label="A lot" value="key0"/>
									<Item label="Finishing soon" value="key1" />
									<Item label="Sufficient" value="key2" />
								</Picker>

								<Piece rounded style={{padding: 5}}>
									<Input placeholder='When will food expire' style={{fontSize: 11, height: 25}}/>
								</Piece>
							</Form>
						</View>

						<View padder style={{flex: 1, flexDirection: 'row', marginBottom: (PixelRatio.get() === 2) ? 50 : 150}}>
              <Button iconLeft small transparent>
                <Icon name='md-add-circle' style={{color: '#4de2c2', fontSize: 30}}/>
                <Text style={{color: '#4de2c2', fontWeight: '600', alignSelf: 'flex-start'}}>Add Dietary Restriction</Text>
              </Button>
            </View>

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
