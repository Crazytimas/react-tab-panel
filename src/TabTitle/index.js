import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from '../join'
import assignDefined from '../assignDefined'

import bemFactory from '../bemFactory'
import FlexiBox from './FlexiBox'

const toNumber = (n) => parseInt(n, 10)

const getBorderPaddingSize = (node) => {
  const computedStyle = global.getComputedStyle(node)

  return {
    left: toNumber(computedStyle.borderLeftWidth) + toNumber(computedStyle.paddingLeft),
    right: toNumber(computedStyle.borderRightWidth) + toNumber(computedStyle.paddingRight),
    top: toNumber(computedStyle.borderTopWidth) + toNumber(computedStyle.paddingTop),
    bottom: toNumber(computedStyle.borderBottomWidth) + toNumber(computedStyle.paddingBottom)
  }
}

const CLASS_NAME = 'react-tab-panel__tab-title'
const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)

const invert = ({width, height}) => {
  return {
    height: width,
    width: height
  }
}

const HIDDEN_STYLE = {
  position: 'absolute',
  visibility: 'hidden',
  width: 'auto',
  minWidth: 'auto',
  maxWidth: 'auto',
  height: 'auto',
  minHeight: 'auto',
  maxHeight: 'auto'
}

export default class TabTitle extends Component {

  constructor(props){
    super(props)

    this.state = {
      style: {},
      size: {},
      hiddenSize: {},
      innerSize: {}
    }
  }

  prepareClassName(props){

    return join(
      props.className,
      CLASS_NAME,

      props.first && m('first'),
      props.last && m('last'),

      props.vertical && m('vertical'),
      props.active && m('active'),

      props.beforeActive && m('before-active'),
      props.afterActive && m('after-active'),

      props.disabled && m('disabled'),
      props.tabEllipsis && m('ellipsis')
    )
  }

  prepareInnerClassName(props){
    return join(
      bem('inner'),
      props.active && bem('inner','active'),
      props.tabEllipsis && bem('inner','ellipsis')
    )
  }

  prepareChildren(props){
    return (props.tabTitle !== undefined?
      props.tabTitle:
      props.children) || '\u00a0'
  }

  prepareInnerStyle(props){
    const tabStyle = props.tabStyle

    const innerStyle = (
      typeof tabStyle == 'function'?
        tabStyle(props):
        tabStyle
      ) || {}

    return assign({}, innerStyle)
  }

  prepareStyle(props, innerStyle){

    let style = assign({}, props.style)

    if (props.vertical) {
      //on vertical tabs - the name of the dimensions are inversed
      const dimensionStyles = {
        height: 'width',
        minHeight: 'minWidth',
        maxHeight: 'maxWidth'
      }

      Object.keys(dimensionStyles).forEach(name => {
        //NOTE: inner is rotated!
        const value = innerStyle[name]

        if (value !== undefined){
          style[name] = value
          delete innerStyle[name]
          innerStyle[dimensionStyles[name]] = value
        }
      })

    }

    if (props.tabAlign === 'stretch'){

      //if we are in stretch mode, the size
      //dimensions should be set on the style object (if they are specified)
      //not on the innerStyle, since the main div will now give the dimension


      const dimensions = props.vertical?
        [ 'height', 'minHeight', 'maxHeight' ]:
        [ 'width', 'minWidth', 'maxWidth' ]


      dimensions.forEach(name => {
        const value = innerStyle[name]

        if (value !== undefined){
          style[name] = value
          delete innerStyle[name]
        }
      })
    }

    return style
  }

  render(){

    const props = assign({}, this.props)

    const { index } = props

    const className = this.prepareClassName(props)
    const innerClassName = this.prepareInnerClassName(props)
    const children = this.prepareChildren(props)

    const {
      innerSize,
      hiddenSize
    } = this.state

    const innerStyle = this.prepareInnerStyle(props)
    const style = this.prepareStyle(props, innerStyle)

    //HAIRY LOGIC - all needed for vertical tabs!
    if (props.vertical){
      if (props.tabAlign != 'stretch'){
        style.minWidth = innerSize.height
        style.height = innerSize.width
      } else {
        style.minWidth = innerSize.height
        style.height = hiddenSize.width
      }
    }

    const renderProps = assign({}, props, {
      style,
      disabled: null,
      className,
      [this.props.activateEvent || 'onClick']: this.onActivate
    })

    const innerProps = {
      key: 'inner',
      style: innerStyle,
      className: innerClassName,
      children: [
        children,
        props.vertical && <NotifyResize measureSize={this.measureInnerSize} onResize={this.onInnerResize} notifyOnMount />
      ]
    }

    if (props.vertical && props.tabAlign === 'stretch'){
      const verticalFix = <div
        key="innerHidden"
        className={join(innerClassName, bem('inner','hidden'))}
        style={assign({}, innerStyle, HIDDEN_STYLE)}
      >
        {children}
        <NotifyResize onResize={this.onHiddenResize} notifyOnMount/>
      </div>

      return <FlexiBox {...renderProps}>
      {({ width, height }) => {

        height = Math.max(height || 0, hiddenSize.width || 0)

        return [
          <div
            {...innerProps}
            style={assign({}, innerStyle, { width: height })}
          />,
          verticalFix
        ]
      }}
      </FlexiBox>
    }

    return <div {...renderProps}>
      <div {...innerProps} />
    </div>
  }

  measureInnerSize(node){

    let height = node.offsetHeight
    let width = node.offsetWidth

    if (this.props.vertical){
      const borderPaddingSize = getBorderPaddingSize(node.parentNode)
      height += borderPaddingSize.left + borderPaddingSize.right
    }

    return {
      width,
      height
    }
  }

  onInnerResize({ width, height }){
    this.setState({
      innerSize: { width, height }
    })
  }

  onHiddenResize({ width, height }){
    this.setState({
      hiddenSize: { width, height }
    })
  }

  onActivate(event){
    const eventName = this.props.activateEvent || 'onClick'
    const domNode = findDOMNode(this)

    if (typeof this.props[eventName] === 'function'){
      this.props[eventName](event)
    }

    !this.props.disabled && this.props.onActivate(domNode)
  }
}

TabTitle.propTypes = {
  disabled: PropTypes.bool,
  tabEllipsis: PropTypes.bool,
  activateEvent: PropTypes.oneOf([
    'onClick',
    'onMouseEnter',
    'onMouseDown'
  ]),
  onActivate: PropTypes.func
}

TabTitle.defaultProps = {
  onActivate: () => {}
}
