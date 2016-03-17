import React from 'react'
import Component from 'react-class'

import TabPanel from './src'
import './style/base.scss'
import './style/theme/default/index.scss'
import './style/theme/red/index.scss'
import './style/theme/flat/index.scss'

import { TabStrip, TabBody } from './src'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      index: 1
    }
  }

  onActivate(index){
    this.setState({
      index
    })
  }

  render(){
    return <div>
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
        tabs={[
          'a',
          'b',
          'c',
          'd',
          'e'
        ]}
        style={{ marginBottom: 20 }}
      />
      <TabPanel
        theme="flat"
        xtabAlign="end"
        activeIndex={this.state.index}
        onActivate={this.onActivate}
        style={{minWidth: '100%'}}
      >
        <TabBody renderContent={(c) => {
          return <div style={{padding: 100}}>
            {c}
          </div>
        }}>
          <div tabTitle="First" tabProps={{xdisabled: true}}>
            first tabLorem ipsum In velit veniam elit officia sunt.
          </div>

          <div tabTitle="second tabTitle" tabProps={{onClick: (e) => console.log(e)}}>
            secondLorem ipsum Qui ad aute labore elit eiusmod dolor dolor eiusmod commodo magna dolore quis ut ex dolor laborum pariatur dolore ullamco magna ex dolor anim consectetur magna cupidatat aliquip ea cupidatat elit eu labore in esse et.
          </div>

          <div tabTitle="third tab title">
            thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
          </div>
        </TabBody>

      </TabPanel>
    </div>
  }
}
