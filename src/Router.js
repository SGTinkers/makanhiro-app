/* @flow */
import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';

/* header */
import TrueHeader from './components/TrueHeader';

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
	      	<Scene key="browsePost" component={BrowsePost} navBar={() => <TrueHeader />} initial />
		      <Scene key="viewPost" component={ViewPost} navBar={() => <TrueHeader header={'View Post'}/>} />
	      	<Scene key="createPost" component={CreatePost} navBar={() => <TrueHeader header={'Create Post'}/>} />
	      	<Scene key="editPost" component={EditPost} navBar={() => <TrueHeader header={'Edit Post'}/>} />
	      </Stack>
	    </Router>
	);

};
export default RouterComponent;
