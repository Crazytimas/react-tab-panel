import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'
import { Flex } from 'react-flex'

import join from './join'

import TabStrip from './TabStrip'
import Body from './Body'

import assignDefined from './assignDefined'

import TAB_POSITION_MAP from './tabPositions'
import bemFactory from './bemFactory'

const CLASS_NAME = 'react-tab-panel'
const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)

export default class TabPanel extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  prepareClassName(props){
    return join(
      props.className,
      CLASS_NAME,

      m(`orientation-${props.vertical? 'vertical': 'horizontal'}`),

      m(`theme-${props.theme}`),

      m(`tab-align-${props.tabAlign}`),

      m(`tab-position-${props.tabPosition}`)
    )
  }

  prepareProps(thisProps){
    const props = assign({}, thisProps)

    let tabStrip = {}
    let tabBody

    let tabStripIndex
    let tabBodyIndex

    let children = React.Children
      .toArray(props.children)
      .filter((child, index) => {
        if (child && child.props && child.props.isTabStrip){
          tabStrip = child.props
          tabStripIndex = index
          return false
        }

        if (child && child.props && child.props.isTabBody){
          tabBody = child.props
          tabBodyIndex = index
          return false
        }

        return true
      })

    if (tabBody){
      children = tabBody.children
    }

    props.activeIndex = this.prepareActiveIndex(props)
    props.tabPosition = this.prepareTabPosition(props, { tabStripIndex, tabBodyIndex })

    props.vertical = props.vertical && (props.tabPosition == 'left' || props.tabPosition == 'right')
    props.tabStrip = tabStrip
    props.tabBody = tabBody
    props.children = children

    return props
  }

  prepareTabPosition(props, { tabStripIndex, tabBodyIndex }){
    let tabPosition = props.tabPosition in TAB_POSITION_MAP? props.tabPosition: 'top'

    if (
      !props.tabPosition &&
      tabStripIndex !== undefined &&
      tabBodyIndex !== undefined &&
      tabStripIndex > tabBodyIndex
    ){
      tabPosition = 'bottom'
    }

    return tabPosition
  }

  prepareActiveIndex(props){
    return props.activeIndex == null?
                        this.state.activeIndex:
                        props.activeIndex
  }

  render(){

    const props = this.p = this.prepareProps(this.props)

    const className = this.prepareClassName(props)

    const tabStripFirst = props.tabPosition == 'top' || props.tabPosition == 'left'
    const row = props.tabPosition == 'left' || props.tabPosition == 'right'

    const rowColConfig = {
      [row? 'row': 'column']: true
    }

    return <Flex wrap={false} alignItems="stretch" {...rowColConfig} inline {...props} tabIndex={null} className={className}>
      {tabStripFirst && this.renderTabStrip()}
      {this.renderBody()}
      {!tabStripFirst && this.renderTabStrip()}
    </Flex>
  }

  onActivate(activeIndex){

    if (this.props.activeIndex == null ){
      this.setState({
        activeIndex
      })
    }

    this.props.onActivate(activeIndex)
  }

  renderTabStrip(){
    const children = Array.isArray(this.p.children)? this.p.children: [this.p.children]

    const tabs = children.map(child => {
      const childProps = child && child.props? child.props: null

      if (!childProps){
        return null
      }

      return assign({
        title: childProps.tabTitle || '',
        disabled: childProps.disabled
      }, childProps.tabProps)

    }).filter(x => !!x)

    const {
      activeIndex,
      activateEvent,
      scroller,
      scrollSpringConfig,
      scrollOnClick,
      tabFactory,
      tabStripFactory,
      theme,
      tabAlign,
      tabStyle,
      tabPosition,
      tabEllipsis,
      tabIndex,
      vertical
    } = this.p

    const newTabStripProps = {
      activateEvent,
      onActivate: this.onActivate,
      activeIndex,
      tabFactory,
      tabAlign,
      theme,
      defaultTabs: tabs,
      tabPosition,
      inTabPanel: true
    }

    assignDefined(newTabStripProps, {
      scroller,
      scrollSpringConfig,
      scrollOnClick,
      vertical,
      tabStyle,
      tabEllipsis,
      tabIndex
    })

    const tabStripProps = assign(
      { tabFactory },
      this.p.tabStrip,
      newTabStripProps
    )

    let tabStrip

    if (tabStripFactory){
      tabStrip = tabStripFactory(tabStripProps)
    }

    if (tabStrip === undefined){
      tabStrip = <TabStrip {...tabStripProps} />
    }

    return tabStrip
  }

  renderBody(){
    const { children, activeIndex, strategy } = this.p

    const bodyChildren = strategy(children, activeIndex)

    const bodyProps = assign({}, this.p.tabBody, {
      activeIndex,
      tabPosition: this.p.tabPosition,
      children: bodyChildren
    })

    return <Body {...bodyProps} />
  }
}

TabPanel.propTypes = {
  tabStripFactory: PropTypes.func,
  tabFactory: PropTypes.func
}

TabPanel.defaultProps = {
  theme: 'default',
  tabAlign: 'start',
  onActivate: () => {},
  strategy: (children, activeIndex) => children[activeIndex]
}

export {
  TabStrip,
  Body as TabBody
}
