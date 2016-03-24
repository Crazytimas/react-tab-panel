import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'

import TabStrip from './TabStrip'
import Body from './Body'

export default class TabPanel extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  render(){

    const { props } = this
    const p = assign({}, props)

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

    let tabPosition = props.tabPosition || 'top'

    if (
      !props.tabPosition &&
      tabStripIndex !== undefined &&
      tabBodyIndex !== undefined &&
      tabStripIndex > tabBodyIndex
    ){
      tabPosition = 'bottom'
    }

    p.tabPosition = tabPosition

    p.tabStrip = tabStrip
    p.tabBody = tabBody

    p.children = children

    p.activeIndex = props.activeIndex == null?
                        this.state.activeIndex:
                        props.activeIndex

    this.p = p

    const className = join(
      props.className,
      'react-tab-panel',

      `react-tab-panel--theme-${props.theme}`,

      `react-tab-panel--tab-align-${props.tabAlign}`,

      `react-tab-panel--tab-position-${tabPosition}`
    )

    const top = tabPosition == 'top'

    return <div {...props} className={className}>
      {top && this.renderTabStrip()}
      {this.renderBody()}
      {!top && this.renderTabStrip()}
    </div>
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
    const children = Array.isArray(this.p.children): this.p.children: [this.p.children]

    const tabs = children.map(child => {
      return child && child.props?
              assign({
                title: child.props.tabTitle || '',
                disabled: child.props.disabled
              }, child.props.tabProps)
              :
              null
    }).filter(x => !!x)

    const {
      activeIndex,
      tabFactory,
      tabStripFactory,
      theme,
      tabAlign,
      tabPosition
    } = this.p

    const newTabStripProps = {
      //call both this.onActive AND the tabStrip provided one
      onActivate: this.onActivate,
      activeIndex,
      tabFactory,
      tabAlign,
      theme,
      tabs,
      tabPosition,
      inTabPanel: true
    }

    const tabStripProps = assign(
      {
        tabFactory,
      },
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
