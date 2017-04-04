import React from 'react'
import Directory from '../components/Directory'

export default class Teaching extends React.Component {
	render() {
		const { params } = this.props;
		return (
			<div>
				<h1>Teaching</h1>
				<h4>{params.page}</h4>
				<Directory>
					{'One'}
					{'Two'}
				</Directory>
			</div>
		);
	}
}
