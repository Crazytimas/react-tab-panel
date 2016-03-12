import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'

export default class Body extends Component {

  render(){

    const { props } = this
    const className = join(props.className, 'react-tab-panel__body')

    return <div {...props} className={className} />
  }
}
