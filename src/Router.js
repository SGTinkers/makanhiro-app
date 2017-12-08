/* @flow */
import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';

/* header */
import Header from './components/Header';

/* content */
import Login from './components/Login';
import BrowsePost from './components/BrowsePost';
import ViewPost from './components/ViewDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const RouterComponent = () => {

	return (
	  <Router>
	      <Stack key="root">
	        {/* <Scene key="login" component={Login} title="login" initial /> */}
	      	<Scene key="browsePost" component={BrowsePost} navBar={() => <Header />} initial />
		      <Scene key="viewPost" component={ViewPost} navBar={() => <Header header={'View Post'}/>} />
	      	<Scene key="createPost" component={CreatePost} navBar={() => <Header header={'Create Post'}/>} />
	      	<Scene key="editPost" component={EditPost} navBar={() => <Header header={'Edit Post'}/>} />
	      </Stack>
	    </Router>
	);

};
export default RouterComponent;
