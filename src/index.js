import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'

import TabStrip from './TabStrip'
import Body from './Body'

const chain = (...fns) => {
  return (...args) => {
    fns.forEach(f => {
      f(...args)
    })
  }
}

export default class TabPanel extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeIndex: props.defaultActiveIndex || 0
    }
  }

  render(){

    const { props } = this
    const className = join(props.className, 'react-tab-panel', `react-tab-panel--theme-${props.theme}`)

    const p = assign({}, props)

    let tabStrip = {}
    p.children = React.Children.toArray(props.children).filter(child => {
      if (child && child.props && child.props.isTabStrip){
        tabStrip = child.props
        return false
      }

      return true
    })

    p.tabStrip = tabStrip

    let activeIndex = tabStrip.activeIndex == null && props.activeIndex == null?
                        this.state.activeIndex:
                        tabStrip.activeIndex == null?
                          props.activeIndex:
                          tabStrip.activeIndex

    p.activeIndex = activeIndex

    this.p = p

    return <div {...props} className={className}>
      {this.renderTabStrip()}
      {this.renderBody()}
    </div>
  }

  onActivate(activeIndex){

    if (this.props.activeIndex == null){
      this.setState({
        activeIndex
      })
    }

    this.props.onActivate(activeIndex)
  }

  renderTabStrip(){
    const tabs = this.p.children.map(child => {
      return child && child.props?
              assign({
                title: child.props.tabTitle || '',
                disabled: child.props.disabled
              }, child.props.tabProps)
              :
              null
    }).filter(x => !!x)

    const { activeIndex, tabFactory, tabStripFactory } = this.p

    const tabStripProps = assign(
      {
        tabFactory,
      },
      this.p.tabStrip,
      {
        onActivate: chain(this.onActivate, this.p.tabStrip.onActivate),
        tabFactory,
        tabs
      }
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

    const bodyProps = {
      activeIndex,
      children: bodyChildren
    }

    return <Body {...bodyProps} />
  }
}

TabPanel.propTypes = {
  tabStripFactory: PropTypes.func,
  tabFactory: PropTypes.func
}

TabPanel.defaultProps = {
  theme: 'default',
  onActivate: () => {},
  strategy: (children, activeIndex) => children[activeIndex]
}

export {
  TabStrip
}
