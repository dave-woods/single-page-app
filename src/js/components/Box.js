import React from 'react'

class Box extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passed: this.props.passed || false,
      completed: this.props.completed || false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.props.passed) {
      return
    }
    this.props.passTask(1)
    this.setState({
      passed: true,
      completed: true
    })
  }

  render () {
    const { color } = this.props
    const { passed, completed } = this.state
    const passedCompletedStyle = {
      backgroundColor: color
    }
    const passedUncompletedStyle = {
      backgroundColor: 'dimgray',
      color
    }
    const unpassedStyle = {
      backgroundColor: 'lightgray',
      color: 'dimgray',
      textShadow: 'none',
      cursor: 'pointer'
    }
    const style = passed ? (completed ? passedCompletedStyle : passedUncompletedStyle) : unpassedStyle
    return (
      <div className='box' style={style} onClick={this.handleClick}>
        {passed ? (completed ? '✔' : '✕') : '➕'}
      </div>
    )
  }
}

export default Box
