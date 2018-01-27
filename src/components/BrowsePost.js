import React from 'react';
import { Text } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/MainStyles';

import MyPost from './MyPost';
import PostList from './PostList';

const BrowsePost = () => {
  const { btnCreatePostText, btnCreatePost } = styles;
  return (
    <Container>
      <Content padder style={{ backgroundColor: 'white' }}>
        <MyPost />
        <PostList />
      </Content>
      <Button onPress={Actions.createPost} iconLeft rounded style={btnCreatePost}>
        <Icon name="md-add" />
        <Text style={btnCreatePostText}>Create a Post</Text>
      </Button>
    </Container>
  );
};

export default BrowsePost;
