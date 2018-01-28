import React, { Component } from 'react';
import { PixelRatio } from 'react-native';
import { Form, Container, Content,
  Item as Piece, Input,
  Button, Text, Thumbnail,
  Badge, Right, Left,
  View, Picker, Icon } from 'native-base';

const { Item } = Picker;

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected5: 'key2',
    };
  }

  onValueChange5(value: string) {
    this.setState({
      selected5: value,
    });
  }

  render() {
    return (
      <Container>
        <Content padder style={{ backgroundColor: '#f7f7f7' }}>
          {/* photos */}
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
            <Button large transparent style={{ marginRight: 10 }}>
              <Thumbnail large square source={require('../../img/nasi-lemak.jpg')} style={{ borderRadius: 12 }} />
              <Icon name="md-remove-circle" style={{ position: 'absolute', top: '13%', left: '5%', color: '#00000070', fontSize: 48 }} />
            </Button>
            <Button large transparent style={{ marginRight: 10 }}>
              <Thumbnail large square source={require('../../img/nasi-lemak.jpg')} style={{ borderRadius: 12 }} />
              <Icon name="md-remove-circle" style={{ position: 'absolute', top: '13%', left: '5%', color: '#00000070', fontSize: 48 }} />
            </Button>
            <Button large transparent style={{ marginRight: 10 }}>
              <Thumbnail large square source={require('../../icon/add-photo.png')} style={{ borderRadius: 12 }} />
            </Button>
          </View>

          {/* form input */}
          <View style={{ marginTop: 30 }}>
            <Form style={{ padding: 10 }}>
              <Piece rounded style={{ padding: 5, marginBottom: 23 }}>
                <Input floatingLabel value="We have loads of Nasi Lemak. Come quick before its finished!" multiline={true} numberOfLines={3} placeholder="Short description of food" style={{height: 100, fontSize: 13}}/>
              </Piece>
              <Piece rounded style={{ padding: 5, marginBottom: 23 }}>
                <Input value="SIH, Braddel Rd 19 #01-555" placeholder="Location" style={{ fontSize: 11, height: 25 }}/>
              </Piece>

              <Picker
                textStyle={{ fontSize: 11 }}
                style={{ alignSelf: 'stretch', marginBottom: 20, borderRadius: 20, borderWidth: 0.5, borderColor: "#d6d7da" }}
                mode="dropdown"
                headerStyle={{ backgroundColor: '#b95dd3' }}
                headerBackButtonTextStyle={{ color: '#fff' }}
                headerTitleStyle={{ color: '#fff' }}
                selectedValue={this.state.selected5}
                onValueChange={this.onValueChange5.bind(this)}
              >

                <Item label="A lot" value="key0" />
                <Item label="Finishing soon" value="key1" />
                <Item label="Sufficient" value="key2" />
              </Picker>

              <Piece rounded style={{ padding: 5 }}>
                <Input placeholder="When will food expire?" style={{ fontSize: 11, height: 25 }} />
              </Piece>
            </Form>
          </View>

          <View padder style={{ flex: 1, flexDirection: 'row', marginBottom: (PixelRatio.get() === 2) ? 50 : 150 }}>
            <Button small disabled transparent>
              <Badge style={{ backgroundColor: '#4de2c2', marginRight: 5 }}>
                <Text style={{ color: 'white', fontSize: 10 }}>Contain Nuts</Text>
              </Badge>
            </Button>
            <Button small transparent onPress={console.log('Button + is pressed!')}>
              <Badge success style={{ backgroundColor: '#4de2c2' }}>
                <Text>+</Text>
              </Badge>
            </Button>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Left />
            <Button iconRight rounded style={{ backgroundColor: '#c517d8', flex: 2 }}>
              <Text>Save Post</Text>
              <Icon name="checkmark" />
            </Button>
            <Right />
          </View>
        </Content>
      </Container>
    );
  }
}

export default EditPost;
