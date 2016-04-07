import React from 'react'
import Component from 'react-class'

import { Flex } from 'react-flex'
import TabPanel from '../src'
import '../style/base.scss'
import '../style/theme/default/index.scss'
import '../style/theme/red/index.scss'
import '../style/theme/blue/index.scss'
import '../style/theme/flat/index.scss'

import { TabStrip, TabBody } from '../src'

import Demo from './TabPositionDemo'

const render = (position, props = {}) => {
  const upper = position.toUpperCase()

  const style = assign({}, props.style, {
    height: 200
  })

  return <TabPanel tabPosition={position} {...props} style={style}>
    <div tabTitle={`${upper} - first tab`}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={<div>{upper} <Icon name="lock_outline" /> with icon</div>}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={<Icon name="perm_identity" />}>
      Lorem ipsum Exercitation ut dolore.
    </div>
  </TabPanel>
}


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

  removeTab(){
    this.setState({
      tabs: this.state.tabs.slice(1)
    })
  }

  setSecondTab(event){
    this.setState({
      secondTabTitle: event.target.value
    })
  }

  render(){
    return <Flex column>
      <input type="text" value={this.state.secondTabTitle} onChange={this.setSecondTab}/>
      <br />

      <TabPanel
        scrollAllVisible={false}
        style={{width: 'auto', xmaxHeight: 200, minWidth: 300, maxWidth: 400, margin: 20}}
        activeIndex={this.state.index}
        onActivate={this.onActivate}
        tabPosition="left"
        tabIndex
        tabEllipsis
        vertical
        tabStyle={{ padding: 30 }}
        xstyle={{top: 20, left: 0, margin: 20, xwidth: '70%', xminHeight: 700, xposition: 'absolute'}}
      >
        <Demo tabTitle="demo"/>

        <div tabProps={{ title: firstTabTitle }}>
          first tabLorem
        </div>

        <div tabTitle={<div>{this.state.secondTabTitle}<br />tst</div>} >
          secondLorem ipsum Qui ad aute labore elit eiusmod dolor dolor eiusmod commodo magna dolore quis ut ex dolor laborum pariatur dolore ullamco magna ex dolor anim consectetur magna cupidatat aliquip ea cupidatat elit eu labore in esse et.
        </div>

        <div tabTitle="third tab title long title">
          thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
        </div>

        <div tabTitle="Fourth title is so so so long that it doesnt even fit">
          thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
        </div>
      </TabPanel>
    </Flex>
  }
}
