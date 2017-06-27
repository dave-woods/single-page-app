import React from 'react'

import Box from './Box.js'

class BoxSeries extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      completed: this.props.completed || [],
      streak: (this.props.completed || []).join('').split('0').slice(-1)[0].length
    }
    this.passTask = this.passTask.bind(this)
  }

  passTask (goal = 0) {
    const completed = this.state.completed
    completed.push(goal)
    this.setState({
      completed,
      streak: (goal ? this.state.streak + 1 : goal)
    })
  }

  render () {
    const items = []
    const { completed } = this.state
    const mini = completed.slice(-6) // last 6 days of the week
    for (let i = 0; i < mini.length; i++) {
      items.push(<Box key={i + (completed.length - mini.length)} color={this.props.color} passed completed={mini[i]} />)
    }
    items.push(<Box key={completed.length} color={this.props.color} passTask={this.passTask} />) // today
    return (
      <div className='box-series-wrap'>
        <h3 className='label'>{this.props.label || 'Label'}</h3>
        <div className='box-series'>{items}</div>
        <h3 className='streak'>{this.state.streak}</h3>
      </div>
    )
  }
}

export default BoxSeries
