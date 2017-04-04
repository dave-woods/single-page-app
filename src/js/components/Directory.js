import React from 'react'

export default class Directory extends React.Component {
	render() {
		const links = this.props.children;
		return (
			<ul>
				{ React.Children.map(links, (child, i) => <li key={i}>{child}</li>) }
			</ul>
		);
	}
}
