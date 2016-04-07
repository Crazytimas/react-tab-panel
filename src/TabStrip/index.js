import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'

import { Flex, Item } from 'react-flex'

import TAB_POSITION_MAP from '../tabPositions'
import join from '../join'
import TabTitle from '../TabTitle'
import bemFactory from '../bemFactory'

import Scroller from './Scroller'

const CLASS_NAME = 'react-tab-panel__tab-strip'

const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)

export default class TabStrip extends Component {

  constructor(props){
    super(props)

    this.tabNodes = []
    this.state = {
      focused,
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  prepareClassName(props){
    return join(
      props.className,
      CLASS_NAME,


      m(`theme-${props.theme}`),
      m(`tab-align-${props.tabAlign}`),
      m(`tab-position-${props.tabPosition}`),

      m(`orientation-${props.vertical? 'vertical': 'horizontal'}`),
      props.focused && m('focused'),
      props.vertical && m('vertical'),
      props.firstActive && m('first-active'),
      props.lastActive && m('last-active')
    )
  }

  prepareProps(thisProps) {
    const props = assign({}, thisProps)

    const activeIndex = props.activeIndex == null?
                        this.state.activeIndex:
                        props.activeIndex

    props.activeIndex = activeIndex
    props.tabs = props.defaultTabs || props.tabs
    props.tabIndex = typeof props.tabIndex === 'boolean'?
                    props.tabIndex? 0: -1
                    :
                    props.tabIndex

    props.firstActive = activeIndex === 0
    props.lastActive = activeIndex === props.tabs.length - 1
    props.allTabsProps = []

    props.onFocus = this.onFocus
    props.onBlur = this.onBlur
    props.onKeyDown = this.onKeyDown
    props.focused = this.state.focused

    return props
  }

  render(){

    const props = this.p = this.prepareProps(this.props)

    const className = this.prepareClassName(props)

    const beforeClassName = join(
      bem('before'),
      props.firstActive && bem('before', 'before-active')
    )

    const afterClassName = join(
      bem('after'),
      props.lastActive && bem('after', 'after-active')
    )

    const { tabPosition } = props

    const row = tabPosition == 'top' || tabPosition == 'bottom'

    const renderProps = assign({}, props, {
      alignItems: 'stretch',
      row,
      column: !row,
      wrap: false,
      className
    })

    const childProps = {
      className: bem('inner'),
      alignItems: "stretch",
      row: row,
      column: !row,
      wrap: false,
      children: [
        <Item className={beforeClassName} />,
        props.tabs.map(this.renderTab),
        <Item className={afterClassName} />
      ]
    }

    let renderChildren = []

    if (props.scroller === false){
      return <Flex {...renderProps}>
        <Flex {...childProps} />
      </Flex>
    }

    return <Scroller
      ref={(c) => this.scroller = this.scroller || c}
      {...renderProps}
      childProps={childProps}
    />
  }

  onResize(){
  }

  onFocus(event){
    this.setState({
      focused: true
    })

    this.props.onFocus(event, findDOMNode(this))
  }

  onBlur(event){
    this.setState({
      focused: false
    })

    this.props.onBlur(event)
  }

  onKeyDown(event){

    const key = event.key

    if (typeof this.props.onKeyDown == 'function'){
      this.props.onKeyDown(event)
    }

    let dir = 0

    if (key == 'ArrowLeft' || key == 'ArrowUp'){
      dir = -1
    } else if (key == 'ArrowRight' || key == 'ArrowDown'){
      dir = 1
    }

    if (dir){
      return this.onNavigate(dir)
    }

    if (key === 'Home'){
      return this.onNavigateFirst()
    }

    if (key == 'End'){
      return this.onNavigateLast()
    }

  }

  renderTab(tab, index, array){

    const props = this.p
    const {
      activeIndex,
      activateEvent,
      inTabPanel,
      tabStyle,
      tabEllipsis,
      vertical,
      tabAlign
    } = props

    if (typeof tab == 'string'){
      tab = {
        title: tab
      }
    }

    const first = index === 0
    const last = props.tabs.length - 1 === index

    const beforeActive = activeIndex - 1 === index
    const afterActive = activeIndex + 1 === index
    const active = index === activeIndex

    const tabProps = assign({}, tab, {
      ref: (b) => this.tabNodes[index] = findDOMNode(this),
      index,
      activateEvent,
      activeIndex,
      active,
      first,
      last,
      beforeActive,
      afterActive,
      tabAlign,

      tabTitle: tab.title,
      children: tab.title,

      vertical,
      tabStyle,
      tabEllipsis,

      key: index,
      onActivate: this.onActivate.bind(this, index)
    })

    delete tabProps.title

    props.allTabsProps.push(tabProps)

    let tabTitle

    if (props.tabFactory){
      tabTitle = props.tabFactory(tabProps)
    }

    if (tabTitle === undefined){
      tabTitle = <TabTitle {...tabProps} />
    }

    const betweenClassName = join(
      bem('between'),
      beforeActive && bem('between','before-active'),
      active && bem('between', 'after-active')
    )

    return [
      tabTitle,
      !last && <Item className={betweenClassName}/>
    ]
  }

  onNavigate(dir){
    const index = this.p.activeIndex
    this.onActivate(this.getAvailableIndexFrom(index, dir, this.props.rotateNavigation))
  }

  onNavigateFirst(){
    this.onActivate(this.getFirstAvailableIndex())
  }

  onNavigateLast(){
    this.onActivate(this.getLastAvailableIndex())
  }

  onActivate(activeIndex){
    if (!this.p.allTabsProps[activeIndex]){
      return
    }

    if (this.props.activeIndex == null){
      this.setState({
        activeIndex
      })
    }

    if (activeIndex != this.p.activeIndex){
      this.props.onActivate(activeIndex)
    }

    const domNode = this.tabNodes[activeIndex]

    domNode && this.scroller && this.scroller.scrollIntoView(domNode)
  }

  getAvailableIndexFrom(index, dir, rotate){
    const tabs = this.p.allTabsProps || []
    const len = tabs.length

    let firstIndex
    let lastIndex

    if (rotate){
      firstIndex = this.getFirstAvailableIndex()
      lastIndex = this.getLastAvailableIndex()
    }

    let currentTab

    const adjustIndex = (index) => {
      if (rotate){
        if (index < firstIndex){
          index = lastIndex
        } else if (index > lastIndex){
          index = firstIndex
        }
      }

      return index
    }

    let currentIndex = adjustIndex(index + dir)

    while (currentTab = tabs[currentIndex]){
      if (!currentTab.disabled){
        return currentIndex
      }

      currentIndex = adjustIndex(currentIndex + dir)
    }

    return -1
  }

  getFirstAvailableIndex(){
    return this.getAvailableIndexFrom(-1, 1)
  }

  getLastAvailableIndex(){
    const tabs = this.p.allTabsProps || []

    return this.getAvailableIndexFrom(tabs.length, -1)
  }
}

TabStrip.propTypes = {
  tabStyle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),

  rotateNavigation: PropTypes.bool,

  scroller: PropTypes.oneOf([true, false, 'auto']),

  tabIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  tabEllipsis: PropTypes.bool,
  tabPosition: PropTypes.oneOf(['top','bottom','left','right']),

  vertical: (props, propName) => {
    const value = props[propName]

    if (value && (props.tabPosition != 'left' && props.tabPosition != 'right')){
      return new Error('You can only have "vertical" tabs if "tabPosition" is one of "left", "right".')
    }
  },

  tabAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between',
    'stretch'
  ]),

  tabPosition: PropTypes.oneOf(Object.keys(TAB_POSITION_MAP))
}

TabStrip.defaultProps = {
  scroller: 'auto',
  scrollAllVisible: false,
  rotateNavigation: true,
  tabIndex: true,
  tabAlign: 'start',
  tabPosition: 'top',
  theme: 'default',
  onActivate: () => {},
  onBlur: () => {},
  onFocus: () => {},
  isTabStrip: true
}
