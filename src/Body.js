import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import join from './join'

export default class Body extends Component {

  render(){

    const { props } = this
    const className = join(props.className, 'react-tab-panel__body')

    const content = props.renderContent(props.children)

    return <div {...props} className={className} children={content} />
  }
}

Body.propTypes = {
  renderContent: PropTypes.func
}

Body.defaultProps = {
  renderContent: children => children,
  isTabBody: true
}
