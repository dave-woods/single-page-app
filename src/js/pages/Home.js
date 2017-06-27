import React from 'react'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <div className='home-wrap center-text'>
          <h1>David Woods</h1>
          <h5>BA (Mod) Computer Science and Language, Trinity College Dublin</h5>
          <h3>PhD Candidate at the ADAPT Centre, Trinity College Dublin</h3>
        </div>
        <div className='local-links'>
          <hr />
          <h4>Local Links</h4>
          <ol>
            <li><a href='/tml'>TimeML</a></li>
            <li><a href='/successive'>Successive</a></li>
          </ol>
        </div>
      </div>
    )
  }
}
