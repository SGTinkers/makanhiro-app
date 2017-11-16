/* @flow */
import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';

import BrowsePost from './components/BrowsePost';
import ViewPost from './components/ViewDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Login from './components/Login';

/* variations of headers - will be consolidate as 1 component later on */
import Head from './components/Head';
import HeadBack from './components/HeadBack';
import HeadCreate from './components/CreatePostHeader';
import HeadEdit from './components/EditPostHeader';

const RouterComponent = () => {
	let i = 2;
	console.log(i === 0)
return (
  <Router>
      <Stack key="root">
        {/* <Scene key="login" component={Login} title="login" initial /> */}
      	<Scene key="browsePost" component={BrowsePost} navBar={Head} initial />
      	<Scene key="viewPost" component={ViewPost} navBar={HeadBack} />
      	<Scene key="createPost" component={CreatePost} navBar={HeadCreate} />
      	<Scene key="editPost" component={EditPost} navBar={HeadEdit} initial={(i === 0) ? true : false}/>
      </Stack>
    </Router>
);

};
export default RouterComponent;
