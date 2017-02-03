import React from 'react'

export default class Contact extends React.Component {
	// clicker() {
	// 	console.log('clicked');
	// }

	// componentWillMount() {
	// 	console.log('added click listener')
	// 	window.addEventListener('click', this.clicker);
	// }

	// componentWillUnmount() {
	// 	console.log('removed click listener')
	// 	window.removeEventListener('click', this.clicker);
	// }

	render() {
		return (
			<div>
				<h1>Contact</h1>
					<p>Email: <a href="mailto:dwoods@scss.tcd.ie">dwoods@scss.tcd.ie</a>, <a href="mailto:david.woods@adaptcentre.ie">david.woods@adaptcentre.ie</a></p>
					<p>Office: 13 Westland Row, Room 3.3</p>
			</div>
		);
	}
}