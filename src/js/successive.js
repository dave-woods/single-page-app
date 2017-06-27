import React from 'react'
import ReactDOM from 'react-dom'

import BoxSeries from './components/BoxSeries.js'

const Root = () => {
  return (
    <div>
      <h1>Successive</h1>
      <div className='box-series-wrap'>
        <h2 className='label'>Label</h2>
        <div />
        <h2 className='streak'>Streak</h2>
      </div>
      <BoxSeries label='Exercise' color='red' completed={[1, 0, 1, 1, 0, 0, 1]} />
      <BoxSeries label='Language' color='green' />
      <BoxSeries label='Coding' color='blue' completed={[1, 1]} />
      <BoxSeries label='Reading' color='gold' completed={[0]} />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('successive-app'))
