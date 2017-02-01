import React from 'react'
import { Link } from 'react-router'

import Header from '../components/Header'


export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routes: [
				{title: 'Home', path: '/'},
				{title: 'Research', path: 'research'},
				{title: 'Teaching', path: 'teaching'},
				{title: 'Contact', path: 'contact'},
			],
		}
	}

	

	navigate(location) {
		// allows back button
		//this.props.router.push(location)
		// disallows back button
		//this.props.router.replace('/')
	}

	render() {
		return (
			<div>
				<Header routes={this.state.routes}/>
				<div className='body-wrap'>{this.props.children}</div>
				{/*
				{ this.state.routes.map((route, i) => <Link key={i} to={route.path}><button>{route.title}</button></Link>) }
				<button onClick={this.navigate.bind(this, '/')}>Home</button>
				<Link to="research"><button>Research</button></Link>
				<Link to="teaching"><button>Teaching</button></Link>
				<Link to="contact"><button>Contact</button></Link>
				*/}
			</div>
		);
	}
}