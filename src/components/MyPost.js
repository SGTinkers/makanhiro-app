import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Content, Text, View } from 'native-base';

import SinglePost from './SinglePost.ios';
import styles from '../styles/MainStyles';
import { API, POST_PATH } from '../util/constants';

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  async componentWillMount() {
    const userId = await AsyncStorage.getItem('@MyUserId:key')
      .then(res => res)
      .catch(err => console.error(err));

    await fetch(`${API + POST_PATH}?userId=${userId}`)
      .then(response => response.json())
      .then(res => this.setState({ post: res }))
      .catch(err => console.error(err));
  }

  render() {
    const posts = this.state.post;
    if (!posts || posts.length < 1) {
      return <View />;
    }

    return (
      <Content>
        <Text style={styles.yourPostHeading}>
          Your Post
        </Text>
        { posts.map(post => <SinglePost key={post.postId} post={post} />) }
      </Content>
    );
  }
}
