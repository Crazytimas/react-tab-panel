import React from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'
import TabTitle from './TabTitle'

export default class TabStrip extends Component {

  render(){

    const { props } = this
    const { tabs, activeIndex } = props
    const className = join(props.className, 'react-tab-panel__tab-strip')

    return <div {...props} className={className}>
      {tabs.map(this.renderTab)}
    </div>

  }

  renderTab(tab, index){

    const { props } = this
    const { activeIndex } = props

    const tabProps = {
      index,
      activeIndex,
      active: index === activeIndex,

      children: tab.title,
      disabled: tab.disabled,

      key: index,
      onActivate: this.onActivate.bind(this, index)
    }

    let tabTitle

    if (props.tabFactory){
      tabTitle = props.tabFactory(tabProps)
    }

    if (tabTitle === undefined){
      tabTitle = <TabTitle {...tabProps} />
    }

    return tabTitle
  }

  onActivate(index){
    if (index != this.props.activeIndex){
      this.props.onActivate(index)
    }
  }
}

TabStrip.defaultProps = {
  onActivate: () => {},
  isTabStrip: true
}
