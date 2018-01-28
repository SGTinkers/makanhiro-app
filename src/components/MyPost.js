import React, { Component } from 'react';
import { Container, Content, Text, View } from 'native-base';
import axios from 'axios';

import SinglePost from './SinglePost';

// import style
import styles from '../styles/MainStyles';
import { API, POST_PATH } from '../util/constants';

export default class MyPost extends Component {
  async componentWillMount() {
    await this.setState({
      post: this.getMyPostOnly(),
    });
  }
  getMyPostOnly() {
    // get userId first!
    const userId = 'd1eaec93f44c28bdc955336987d82491d444d422d0eb55a0016930cdfe809115';
    axios.get(`${API + POST_PATH}?userId=${userId}`)
      .then(response => this.setState({ post: response.data }));

    // return postEntries;
  }
  render() {
    const posts = this.state.post;
    if (!posts) {
      return <View />
    }
    return (
      <Content>
        <Text style={styles.yourPostHeading}>
          Your Post
        </Text>
        {
          posts.map(post => { return <SinglePost key={post.postId} post={post} /> })
        }
      </Content>
    )
  }
}
