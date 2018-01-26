/* @flow */
import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';

/* header */
import Header from './components/Header';

/* content */
import Login from './components/Login';
import BrowsePost from './components/BrowsePost';
import ViewDetails from './components/ViewDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

/* Just for trying out UI/Components etc. */
import TestingPage from './components/TestingPage';

const RouterComponent = () => {

	return (
	  <Router>
	      <Stack key="root">
	        <Scene key="login" component={Login} title="login" />
	      	<Scene key="browsePost" component={BrowsePost}
						navBar={() => <Header />} />
		      <Scene key="viewPost" component={ViewDetails}
						navBar={() => <Header header={'Details'} />} />
	      	<Scene key="createPost" component={CreatePost}
						navBar={() => <Header header={'Create Post'} />} initial />
	      	<Scene key="editPost" component={EditPost}
						navBar={() => <Header header={'Edit Post'} />} />

					<Scene key="test" component={TestingPage} navBar={ () => <Header /> } />
	      </Stack>
	  </Router>
	);

};
export default RouterComponent;
