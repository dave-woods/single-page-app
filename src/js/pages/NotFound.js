import React from 'react'

export default class NotFound extends React.Component {
	render() {
		return (
			<div className="center-text">
				<h1>Page Not Found</h1>
				<p>The URL <code>{this.props.location.pathname}</code> doesn't seem to exist.</p>
			</div>
		);
	}
}