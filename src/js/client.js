import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './pages/Layout.js'
import Home from './pages/Home.js'
import Research from './pages/Research.js'
import Teaching from './pages/Teaching.js'
import Contact from './pages/Contact.js'
import NotFound from './pages/NotFound.js'

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="/research" component={Research}></Route>
			<Route path="/teaching(/:page)" component={Teaching}></Route>
			<Route path="/contact" component={Contact}></Route>
			<Route path="*" component={NotFound}></Route>
		</Route>
	</Router>,
app);
