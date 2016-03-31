import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import { Flex, Item } from 'react-flex'

import TAB_POSITION_MAP from './tabPositions'
import join from './join'
import TabTitle from './TabTitle'

// import { NotifyResize } from 'react-notify-resize'

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
    p.tabs = props.defaultTabs || props.tabs
    p.tabIndex = typeof p.tabIndex === 'boolean'?
                    p.tabIndex? 0: -1
                    :
                    p.tabIndex

    this.p = p

    p.allTabsProps = []

    const {
      tabs,
      tabAlign,
      tabPosition,
      vertical
    } = p

    const firstActive = activeIndex === 0
    const lastActive = activeIndex === tabs.length - 1

    const className = join(
      props.className,
      'react-tab-panel__tab-strip',
      `react-tab-panel__tab-strip--theme-${props.theme}`,
      `react-tab-panel__tab-strip--tab-align-${props.tabAlign}`,
      `react-tab-panel__tab-strip--tab-position-${props.tabPosition}`,

      vertical && 'react-tab-panel__tab-strip--vertical',
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

    const row = tabPosition == 'top' || tabPosition == 'bottom'

    return <Flex alignItems="stretch" row wrap={false} {...props} className={className}>
      {/*// <NotifyResize onResize={this.onResize} />*/}
      <Flex className="react-tab-panel__tab-strip-inner" alignItems="stretch" row={row} column={!row} wrap={false}>
        <Item className={beforeClassName} />
        {tabs.map(this.renderTab)}
        <Item className={afterClassName} />
      </Flex>
    </Flex>

  }

  onResize(){
    console.log('RESIZE')
  }

  renderTab(tab, index){

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

    const beforeActive = activeIndex - 1 === index
    const afterActive = activeIndex + 1 === index
    const active = index === activeIndex

    const tabProps = assign({}, tab, {
      index,
      activateEvent,
      activeIndex,
      active,
      beforeActive,
      afterActive,
      tabAlign,
      tabIndex,

      tabTitle: tab.title,
      children: tab.title,

      vertical,
      tabStyle,
      tabEllipsis,

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
  rotateNavigation: true,
  tabIndex: true,
  tabAlign: 'start',
  tabPosition: 'top',
  theme: 'default',
  onActivate: () => {},
  isTabStrip: true
}
