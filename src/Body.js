import React, { PropTypes } from 'react'
import Component from 'react-class'
import assign from 'object-assign'

import { Flex } from 'react-flex'

import join from './join'

import bemFactory from './bemFactory'

const CLASS_NAME = 'react-tab-panel__body'

const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)


export default class Body extends Component {

  render(){

    const { props } = this
    const className = join(
      props.className,
      CLASS_NAME,
      m(`tab-position-${props.tabPosition}`)
    )

    const content = props.renderContent(props.children)

    return <Flex column wrap={false} alignItems="start" flex="none" {...props} className={className} children={content} />
  }
}

Body.propTypes = {
  renderContent: PropTypes.func
}

Body.defaultProps = {
  renderContent: children => children,
  isTabBody: true
}
