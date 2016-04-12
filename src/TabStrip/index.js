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

const NEW_TAB = <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  <path d="M0 0h24v24H0z" fill="none"/>
</svg>

const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)

export default class TabStrip extends Component {

  constructor(props){
    super(props)

    this.tabNodes = []
    this.state = {
      focused: false,
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  componentDidUpdate(prevProps, prevState){
    const oldIndex = this.prepareActiveIndex(prevProps, prevState)

    if (oldIndex != this.p.activeIndex){
      const index = this.p.activeIndex

      this.scrollToTab(index)

      setTimeout(() => {
        if (index === this.p.activeIndex){
          this.scrollToTab(index)
        }
      }, 100)
    }
  }

  scrollToTab(index){
    const domNode = this.tabNodes[index]

    domNode && this.scroller && this.scroller.scrollIntoView(domNode)
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

  prepareActiveIndex(props, state){
    return props.activeIndex == null?
                        (state || this.state).activeIndex:
                        props.activeIndex
  }

  prepareProps(thisProps) {
    const props = assign({}, thisProps)

    const activeIndex = this.prepareActiveIndex(props)

    props.activeIndex = activeIndex
    props.tabs = props.defaultTabs || props.tabs

    if (props.onAddNew){
      props.tabs = [
        ...props.tabs,
        {
          title: NEW_TAB,
          selectable: false,
          closeable: false,
          onMouseDown(){
            props.onAddNew()
          }
        }
      ]
    }
    props.tabIndex = typeof props.tabIndex === 'boolean'?
                    props.tabIndex? 0: -1
                    :
                    props.tabIndex

    this.tabNodes.length = props.tabs.length

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
      tabAlign,
      closeable
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

    const tabProps = assign({ closeable }, tab, {
      ref: (b) => this.tabNodes[index] = findDOMNode(b),
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

      key: index
    })

    tabProps.onActivate = this.onActivate.bind(this, index)
    tabProps.onClose = this.onClose.bind(this, index, tab)

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

  onClose(index, tabProps){
    this.props.onCloseTab(index)

    if (tabProps.onClose) {
      tabProps.onClose()
    }
  }

  onActivate(activeIndex){
    if (!this.p.allTabsProps[activeIndex]){
      return
    }

    const tabProps = this.p.tabs[activeIndex]

    if (!this.isSelectableTab(tabProps)){
      return
    }

    if (tabProps && tabProps.onActivate){
      if (tabProps.onActivate() === false){
        return
      }
    }

    if (this.props.activeIndex == null){
      this.setState({
        activeIndex
      })
    }

    if (activeIndex != this.p.activeIndex){
      this.props.onActivate(activeIndex)
    }
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
      if (this.isSelectableTab(currentTab)){
        return currentIndex
      }

      currentIndex = adjustIndex(currentIndex + dir)
    }

    return -1
  }

  isSelectableTab(tabOrIndex){
    let tab = tabOrIndex
    if (typeof tabOrIndex == 'number'){
      tab = this.p.allTabsProps[tabOrIndex]
    }
    return !tab.disabled && tab.selectable !== false
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
  scrollOnClick: false,
  rotateNavigation: true,
  tabIndex: true,
  tabAlign: 'start',
  tabPosition: 'top',
  theme: 'default',
  onActivate: () => {},
  onCloseTab: () => {},
  onBlur: () => {},
  onFocus: () => {},
  isTabStrip: true
}
