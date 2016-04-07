import React, { PropTypes } from 'react'
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

    this.state = {
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
      className,
      tabIndex: null
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
      tabIndex
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
      index,
      activateEvent,
      activeIndex,
      active,
      first,
      last,
      beforeActive,
      afterActive,
      tabAlign,
      tabIndex,

      tabTitle: tab.title,
      children: tab.title,

      vertical,
      tabStyle,
      tabEllipsis,

      onFocus: this.onTabFocus.bind(this, index),

      key: index,
      onActivate: this.onActivate.bind(this, index),
      onNavigate: this.onNavigate.bind(this, index),
      onNavigateFirst: this.onNavigateFirst,
      onNavigateLast: this.onNavigateLast
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

  onTabFocus(index, event, domNode){
    event.preventDefault()

    this.scroller && this.scroller.scrollIntoView(domNode)
  }

  onNavigate(index, dir){
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
  isTabStrip: true
}
