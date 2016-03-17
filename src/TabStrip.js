import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import { Flex, Item } from 'react-flex'

import join from './join'
import TabTitle from './TabTitle'

export default class TabStrip extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  render(){

    const { props } = this

    const p = assign({}, props)

    const activeIndex = props.activeIndex == null?
                        this.state.activeIndex:
                        props.activeIndex

    p.activeIndex = activeIndex

    this.p = p

    const {
      tabs,
      tabAlign
    } = props

    const firstActive = activeIndex === 0
    const lastActive = activeIndex === tabs.length - 1

    const className = join(
      props.className,
      'react-tab-panel__tab-strip',
      `react-tab-panel__tab-strip--theme-${props.theme}`,
      `react-tab-panel__tab-strip--tab-align-${props.tabAlign}`,
      `react-tab-panel__tab-strip--tab-position-${props.tabPosition}`,

      firstActive && 'react-tab-panel__tab-strip--first-active',
      lastActive && 'react-tab-panel__tab-strip--last-active'
    )

    const beforeClassName = join(
      'react-tab-panel__tab-strip-before',
      firstActive && 'react-tab-panel__tab-strip-before--before-active'
    )

    const afterClassName = join(
      'react-tab-panel__tab-strip-after',
      lastActive && 'react-tab-panel__tab-strip-after--after-active'
    )

    return <Flex alignItems="stretch" row wrap={false} {...props} className={className}>
      <Item className={beforeClassName} />
      {tabs.map(this.renderTab)}
      <Item className={afterClassName} />
    </Flex>

  }

  renderTab(tab, index){

    const props = this.p
    const { activeIndex, inTabPanel } = props

    if (!inTabPanel && !tab.title){
      tab = {
        title: tab
      }
    }

    const beforeActive = activeIndex - 1 === index
    const afterActive = activeIndex + 1 === index
    const active = index === activeIndex

    const tabProps = assign({}, tab, {
      index,
      activeIndex,
      active,
      beforeActive,
      afterActive,

      children: tab.title,

      key: index,
      onActivate: this.onActivate.bind(this, index)
    })

    delete tabProps.title

    let tabTitle

    if (props.tabFactory){
      tabTitle = props.tabFactory(tabProps)
    }

    if (tabTitle === undefined){
      tabTitle = <TabTitle {...tabProps} />
    }

    const last = props.tabs.length - 1 === index

    const betweenClassName = join(
      'react-tab-panel__tab-strip-between',
      beforeActive && 'react-tab-panel__tab-strip-between--before-active',
      active && 'react-tab-panel__tab-strip-between--after-active'
    )

    return [
      tabTitle,
      !last && <Item className={betweenClassName}/>
    ]
  }

  onActivate(activeIndex){
    if (this.props.activeIndex == null){
      this.setState({
        activeIndex
      })
    }
    if (activeIndex != this.p.activeIndex){
      this.props.onActivate(activeIndex)
    }
  }
}

TabStrip.propTypes = {
  tabAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between',
    'stretch'
  ]),
  tabPosition: PropTypes.oneOf([
    'top',
    'bottom'
  ])
}

TabStrip.defaultProps = {
  tabAlign: 'start',
  tabPosition: 'top',
  theme: 'default',
  onActivate: () => {},
  isTabStrip: true
}
