import React from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'

export default class TabTitle extends Component {

  render(){

    const { props } = this
    const { index } = props

    const className = join(
      props.className,
      'react-tab-panel__tab-title',

      props.active && 'react-tab-panel__tab-title--active',

      props.beforeActive && 'react-tab-panel__tab-title--before-active',
      props.afterActive && 'react-tab-panel__tab-title--after-active',

      props.disabled && 'react-tab-panel__tab-title--disabled'
    )

    const innerClassName = join(
      'react-tab-panel__tab-title-inner',
      props.active && 'react-tab-panel__tab-title-inner--active'
    )

    return <div
      {...props}
      disabled={null}
      className={className}
      onClick={this.onClick}
    >
      <div children={props.children} className={innerClassName}/>
    </div>
  }

  onClick(event){
    this.props.onClick(event)

    !this.props.disabled && this.props.onActivate()
  }
}

TabTitle.defaultProps = {
  onClick: () => {},
  onActivate: () => {}
}
