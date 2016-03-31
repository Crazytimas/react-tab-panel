import React from 'react'
import Component from 'react-class'

import TabPanel from './src'
import './style/base.scss'
import './style/theme/default/index.scss'
import './style/theme/red/index.scss'
import './style/theme/flat/index.scss'

import { TabStrip, TabBody } from './src'


const firstTabTitle = <b> first tab
  <img
    src="https://pbs.twimg.com/profile_images/638751551457103872/KN-NzuRl.png"
    style={{verticalAlign: 'middle', maxWidth: 16, maxWeight: 16}}
  />
</b>;


export default class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      index: 1,
      tabs: [
        'first tab',
        'second tab',
        'third tab',
        'fourth tab',
        'fifth tab'
      ],
      secondTabTitle: 'Second tab'
    }
  }

  onActivate(index){
    this.setState({
      index
    })
  }

  addTab(){
    const index = this.state.tabs.length

    this.setState({
      tabs: this.state.tabs.concat([ index + '. Tab at index ' + index])
    })
  }

  setSecondTab(event){
    this.setState({
      secondTabTitle: event.target.value
    })
  }

  render(){
    return <div>
      <input type="text" value={this.state.secondTabTitle} onChange={this.setSecondTab}/>
      <TabStrip
        defaultActiveIndex={2}
        tabs={[
          'a',
          'b',
          'c',
          'd',
          'e'
        ]}
        style={{ marginBottom: 20 }}
      />
      <TabStrip
        defaultActiveIndex={2}
        theme="red"
        tabs={this.state.tabs}
        style={{ marginBottom: 20, maxWidth: '50%' }}
      />

      <p>
        <button onClick={this.addTab}>add tab</button>
      </p>
      <TabPanel
        activeIndex={this.state.index}
        onActivate={this.onActivate}
        vertical
        tabAlign="space-between"
        tabPosition="left"
        style={{minHeight: 700}}
      >
        <div tabProps={{ title: firstTabTitle }}>
          first tabLorem ipsum In velit veniam elit officia sunt.
        </div>

        <div tabTitle={this.state.secondTabTitle} >
          secondLorem ipsum Qui ad aute labore elit eiusmod dolor dolor eiusmod commodo magna dolore quis ut ex dolor laborum pariatur dolore ullamco magna ex dolor anim consectetur magna cupidatat aliquip ea cupidatat elit eu labore in esse et.
        </div>

        <div tabTitle="third tab title">
          thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
        </div>

        <div tabTitle="Fourth ">
          thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
        </div>
      </TabPanel>
    </div>
  }
}
