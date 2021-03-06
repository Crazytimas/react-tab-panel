import React from 'react'
import Component from 'react-class'

import { Flex } from 'react-flex'
import TabPanel, { Tab, TabBody } from '../src'

import assign from 'object-assign'

import '../style/base.scss'
import '../style/theme/default/index.scss'
import '../style/theme/red/index.scss'
import '../style/theme/blue/index.scss'
import '../style/theme/flat/index.scss'

import { TabStrip } from '../src'

import Demo from './TabPositionDemo'

const render = (position, props = {}) => {
  const upper = position.toUpperCase()

  const style = assign({}, props.style, {
    height: 200
  })

  return <TabPanel
    tabTitle="First important tab"
    tabPosition={position} {...props}
    style={style}
  >

    <TabPanel
      tabTitle="tab complex"
      tabPosition={position} {...props} style={style}>

      <TabPanel
      tabTitle="tab complex child"
      tabPosition={position} {...props} style={style}>
      <div tabTitle={`${upper} - first tab`}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={<div>{upper} <div name="lock_outline" /> with div</div>}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={<div name="perm_identity" />}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={`${upper} - first tab`}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={<div>{upper} <div name="lock_outline" /> with div</div>}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={<div name="perm_identity" />}>
        Lorem ipsum Exercitation ut dolore.
      </div>
    </TabPanel>

    <div tabTitle={`!!!${upper} - first tab`}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={<div>{upper} <div name="lock_outline" /> with div</div>}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={<div name="perm_identity" />}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    </TabPanel>
  </TabPanel>
}


const firstTabTitle = <b> first tab
  <img
    src="https://pbs.twimg.com/profile_images/638751551457103872/KN-NzuRl.png"
    style={{verticalAlign: 'middle', maxWidth: 16, maxWeight: 16}}
  />
</b>;

class Test extends Component {

  render(){
    return <div {...this.props} tabProps={{ title: firstTabTitle }}>
    first tabLorem
Lorem ipsum Sed reprehenderit est anim qui irure in aliqua ullamco commodo ea Duis Ut velit nostrud ea Ut tempor sunt nostrud id minim mollit in ad in eiusmod minim consequat deserunt sunt et aute eiusmod dolor dolor dolore id pariatur enim est non dolore aliqua Ut exercitation irure irure ex deserunt labore Excepteur voluptate voluptate ut veniam elit enim eu Ut consequat sint id magna Ut laborum irure dolore elit dolor qui irure in voluptate culpa deserunt laborum id ex dolor cupidatat aliquip ea labore Ut pariatur ullamco esse nulla deserunt non ex Duis pariatur veniam aliqua nulla incididunt cillum sed veniam officia ut ea irure mollit ut ut do elit consequat Duis magna sit voluptate exercitation anim et ut cillum cillum irure laborum et irure eu sit irure adipisicing dolore dolore enim nostrud tempor mollit sed et mollit quis ex proident dolor sit pariatur qui aliqua voluptate tempor labore voluptate eu occaecat in labore magna minim aliquip est nisi pariatur Ut consequat cillum Excepteur cillum sunt consectetur Excepteur Ut sunt cupidatat ut cillum pariatur id elit eu aliqua adipisicing aliqua cillum magna dolore Excepteur proident irure amet in sit labore irure cillum nulla dolore aliquip fugiat sed do in Excepteur magna deserunt quis sint sit ut enim elit adipisicing Ut dolor aliqua pariatur irure laborum elit laborum sint veniam Duis aliqua culpa consectetur aute dolor dolore anim mollit Excepteur eu dolore consequat proident occaecat nisi nulla sit magna enim officia pariatur quis commodo quis sed quis consequat Ut mollit irure officia eiusmod magna sint proident Excepteur officia adipisicing qui dolore id sunt nisi sed exercitation fugiat.
  </div>
  }
}


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

      <TabPanel strategy={"one"} defaultActiveIndex={1} xtransition theme="default">
        <TabPanel
          tabTitle="test"
          style={{xheight: 200, maxWidth: 600, xmaxWidth: 350, margin: 20}}
          xactiveIndex={this.state.index}
          onActivate={this.onActivate}
          xtabPosition="left"
          tabIndex
          tabEllipsis
          xvertical
          closeable
          onCloseTab={(index) => console.log(index)}
          xtabStyle={{ padding: 30 }}
          xstyle={{top: 20, left: 0, margin: 20, xwidth: '70%', xminHeight: 700, xposition: 'absolute'}}
        >
          {render('top')}

          <Demo tabTitle="demo" tabProps={{onActivate: () => {console.log('close tab')} }}/>

          <Test tabTitle="first tab" />

          <div tabTitle={<div>{this.state.secondTabTitle}<br />tst</div>} >
            secondLorem ipsum Qui ad aute labore elit eiusmod dolor dolor eiusmod commodo magna dolore quis ut ex dolor laborum pariatur dolore ullamco magna ex dolor anim consectetur magna cupidatat aliquip ea cupidatat elit eu labore in esse et.
          </div>

          <div tabTitle="third tab title long title">
            thirdLorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
          </div>

          <div tabTitle="Fourth title is so so so long that it doesnt even fit">
            fourth Lorem ipsum Excepteur magna adipisicing veniam ad Duis eu deserunt irure veniam ex deserunt sit dolor dolor veniam consequat veniam commodo aute laborum ad nisi eu aliquip ut amet occaecat velit incididunt.
  Lorem ipsum Officia eiusmod non labore occaecat sed ut laboris ut nostrud consectetur ex ut commodo sit laborum ut ut anim minim proident do veniam Duis Excepteur ea ut dolor cillum occaecat culpa enim.
          </div>
        </TabPanel>

        <TabPanel tabEllipsis closeable onAddNew={() => console.log('add new') } tabStyle={{maxWidth: 80}} xvertical xtabPosition="right" style={{width: 400}} tabTitle="ecnd" xtransition={true}>
          <TabBody>
            <div tabProps={{xselectable: false, title: "First tab", className:'xxx'}}>
              Lorem ipsum Qui eu cupidatat do exercitation consequat veniam mollit incididunt
            </div>

            <div tabTitle="Second title">
              Lorem ipsum Id eiusmod labore commodo laboris Excepteur culpa magna cillum esse sed commodo non ut enim sit occaecat dolore aliqua cillum sunt consectetur magna pariatur dolore anim nostrud ut commodo culpa cillum.
            </div>

            <Tab title="Third and last!!!" selectable={false} onClick={() => console.log('clicked')}>
              <div>
                <h1>aaa</h1>
                <div>
                  Lorem ipsum Occaecat Ut Excepteur Duis incididunt fugiat qui tempor adipisicing dolore mollit. Lorem ipsum Occaecat Ut Excepteur Duis incididunt fugiat qui tempor adipisicing dolore mollit.
                </div>
              </div>
            </Tab>
          </TabBody>
        </TabPanel>
      </TabPanel>
    </Flex>
  }
}
