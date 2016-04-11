import React, { PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
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

const transitionWrapperClassName = `${CLASS_NAME}__transition-wrapper`

const clone = (child, fn) => {
  const childProps = child.props

  child = cloneElement(child, assign({}, childProps, fn(childProps, child)))

  return child
}

const cloneDisplayNone = (child) => clone(child, (childProps) => {
  const childStyle = childProps? childProps.style: null

  return {
    style: assign({}, childStyle, { display: 'none' })
  }
})

const cloneWithClassName = (className, child) => clone(child, (childProps) => {
  return {
    className: join(childProps? childProps.className: '', className)
  }
})

const STRATEGIES = {

  one: (children, activeIndex) => children[activeIndex],

  all: (children, activeIndex) => {
    return children.map((child, index) => {
      if (index !== activeIndex){
        child = cloneDisplayNone(child)
      }

      return child
    })
  }
}

const IN_CLASS_NAME = 'react-tab-panel__content--in'
const OUT_CLASS_NAME = 'react-tab-panel__content--out'

export default class TabPanel extends Component {

  constructor(props){
    super(props)

    this.state = {
      oldActiveIndex: null,
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

    if (props.transition){
      props.initialStrategy = props.strategy
      props.strategy = this.transitionStrategy
    }

    return props
  }

  componentDidMount(){
    this.body.addEventListener('transitionend', this.onBodyTransitionEnd)
  }

  componentWillUnmount(){
    this.body.removeEventListener('transitionend', this.onBodyTransitionEnd)
  }

  onBodyTransitionEnd(){
    if (!this.state.transitioning){
      return
    }

    this.setState({
      transitioning: null,
      transitionInProgress: false,
      wrapperStyle: null,
      oldActiveIndex: null
    })
  }

  componentWillUpdate(nextProps, nextState){
    const activeIndex = this.p.activeIndex
    const newActiveIndex = this.prepareActiveIndex(nextProps, nextState)

    if (newActiveIndex != activeIndex && nextProps.transition){

      if (!this.wrapper){
        return
      }

      const dir = (newActiveIndex > activeIndex)? 1: -1

      const getActiveChild = () => {
        return this.p.initialStrategy == 'one'?
                this.wrapper.firstChild:
                this.wrapper.children[activeIndex]
      }
      const getOtherChild = () => {
        return this.p.initialStrategy == 'one'?
                (dir == 1? this.wrapper.lastChild: this.wrapper.firstChild):
                this.wrapper.children[newActiveIndex]
      }

      const childHeight = () => {
        const child = getActiveChild()
        return child && child.offsetHeight
      }

      const activeChild = getActiveChild()

      //at this point only 1 child should be rendered
      const currentChildHeight = (activeChild && activeChild.offsetHeight) || 0

      const wrapperStyle = {
        height: this.wrapper.offsetHeight
      }

      if (this.state.transitioning){
        this.onBodyTransitionEnd()
      }

      this.setState({
        transitioning: dir,
        wrapperStyle: {
          height: wrapperStyle.height
        },
        oldActiveIndex: activeIndex
      }, () => {
        if (!this.wrapper){
          this.onBodyTransitionEnd()
        }
        const otherChild = getOtherChild()

        const wrapperHeight = wrapperStyle.height
            - currentChildHeight
            + ((otherChild && otherChild.offsetHeight) || 0)

        this.setState({
          transitioning: dir,
          transitionInProgress: true,
          wrapperStyle: { height: wrapperHeight }
        })
      })
    }
  }

  transitionStrategy(children, activeIndex){

    const strategy = this.p.initialStrategy
    const strategyFn = STRATEGIES[strategy]

    if (!strategyFn){
      console.warn('Strategy not supported for transition')
    }

    if (this.state.oldActiveIndex != null){

      if (strategy == 'one'){
        const indexes = [
          this.state.oldActiveIndex,
          activeIndex
        ]

        //render them in the correct order
        indexes.sort()

        const firstIndex = indexes[0]
        const firstIn = firstIndex == activeIndex

        const secondIndex = indexes[1]

        children = [
          cloneWithClassName(
            firstIn? IN_CLASS_NAME: OUT_CLASS_NAME,
            children[firstIndex]
          ),

          cloneWithClassName(
            firstIn? OUT_CLASS_NAME: IN_CLASS_NAME,
            children[secondIndex]
          )
        ]
      } else {

        //strategy == 'all'
        children = children.map((child, index) => {
          if (index != activeIndex && index != this.state.oldActiveIndex){
            child = cloneDisplayNone(child)
          } else {
            child = cloneWithClassName(
              index == activeIndex ?
                IN_CLASS_NAME:
                OUT_CLASS_NAME
              ,
              child
            )
          }

          return child
        })
      }

    } else {
      children = strategyFn(children, activeIndex)
    }

    return <div
      ref={c=> this.wrapper = c}
      style={this.state.wrapperStyle}
      className={join(transitionWrapperClassName, this.props.vertical? transitionWrapperClassName+'--vertical': '')}
      children={children}
    />
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

  prepareActiveIndex(props, state){
    return props.activeIndex == null?
                        (state || this.state).activeIndex:
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

  applyRenderStrategy({ activeIndex, children, strategy }){

    let fn = STRATEGIES[strategy]

    if (typeof fn != 'function'){
      fn = typeof strategy == 'function'? strategy: STRATEGIES.all
    }

    return fn(children, activeIndex)
  }

  renderBody(){
    const { activeIndex, transition } = this.p

    const bodyChildren = this.applyRenderStrategy(this.p)

    const tabBody = this.p.tabBody || {}

    const bodyProps = assign({}, this.p.tabBody, {
      transition,
      transitionInProgress: this.state.transitionInProgress,
      activeIndex,
      tabPosition: this.p.tabPosition,
      children: bodyChildren
    })

    return <Body
      ref={b => this.body = findDOMNode(b)}
      transitioning={this.state.transitioning}
      {...bodyProps}
      {...this.state.bodyProps}
    />
  }
}

TabPanel.propTypes = {
  tabStripFactory: PropTypes.func,
  tabFactory: PropTypes.func,
  strategy: PropTypes.oneOfType([
    PropTypes.oneOf(['one','all']),
    PropTypes.func
  ])
}

TabPanel.defaultProps = {
  theme: 'default',
  tabAlign: 'start',
  onActivate: () => {},
  strategy: 'one'
}

export {
  TabStrip,
  Body as TabBody
}
