import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routes: this.props.routes,
		}
	}

	render() {
		return (
			<nav>
				{ this.state.routes.map((route, i) => <Link key={i} to={route.path} onlyActiveOnIndex activeClassName="active">{route.title}</Link>) }
			</nav>
		);
	}
}