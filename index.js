import React from 'react'
import { render } from 'react-dom'

import Component from 'react-class'

import TabPanel from './src'
import './style/index.scss'

import { TabStrip } from './src'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      index: 0
    }
  }

  onActivate(index){
    console.log(index)
    this.setState({
      index
    })
  }

  render(){
    return <TabPanel
      activeIndex={this.state.index}
      onActivate={this.onActivate}
    >
      <TabStrip
        style={{padding: 100}}
        onActivate={e => console.log(e,'!!!')}
      />

      <div tabTitle="First" tabProps={{disabled: true}}>
        first tabLorem ipsum In velit veniam elit officia sunt.
      </div>

      <div tabTitle="second tabTitle">
        secondLorem ipsum Qui ad aute labore elit eiusmod dolor dolor eiusmod commodo magna dolore quis ut ex dolor laborum pariatur dolore ullamco magna ex dolor anim consectetur magna cupidatat aliquip ea cupidatat elit eu labore in esse et.
      </div>

      <div tabTitle="third tab title">
        thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
      </div>

    </TabPanel>
  }
}


render(<App />, window.content)
