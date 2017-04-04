import React from 'react'

import Header from '../components/Header'

export default class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  navigate (location) {
    // allows back button
    // this.props.router.push(location)
    // disallows back button
    // this.props.router.replace('/')
  }

  render () {
    return (
      <div>
        <Header location={this.props.location} />
        <div className='body-wrap'>{this.props.children}</div>
      </div>
    )
  }
}
