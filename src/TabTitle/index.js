import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from '../join'
import assignDefined from '../assignDefined'

import bemFactory from '../bemFactory'
import FlexiBox from './FlexiBox'

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

const DivFactory = (props) => <div {...props} />

export default class TabTitle extends Component {

  constructor(props){
    super(props)

    this.state = {
      focused: false,
      style: {},
      size: {},
      hiddenSize: {},
      innerSize: {}
    }
  }

  focus(){
    findDOMNode(this).focus()
  }

  prepareClassName(props){
    return join(
      props.className,
      CLASS_NAME,

      props.focused && m('focused'),
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

    if (props.tabAlign === 'stretch'){
      //if we are in stretch mode, the size (more exactly, width)
      //dimensions should be set on the style object (if they are specified)
      //not on the innerStyle, since the main div will now give the dimension
      [
        'width',
        'minWidth',
        'maxWidth'
      ].concat(
        props.vertical? [
          'height',
          'minHeight',
          'maxWeight'
        ]: []
      )
      .forEach(name => {
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

    const props = assign({}, this.props, {
      focused: this.state.focused
    })

    const { index } = props

    const className = this.prepareClassName(props)
    const innerClassName = this.prepareInnerClassName(props)
    const children = this.prepareChildren(props)

    const {
      size,
      innerSize,
      hiddenSize
    } = this.state

    let innerStyle = this.prepareInnerStyle(props)
    let style = this.prepareStyle(props, innerStyle)

    let verticalFix
    let notifier

    let Factory = DivFactory

    //HAIRY LOGIC - all needed for vertical tabs!
    if (props.vertical){

      //compute style
      style = assign(style, {
        width: innerSize.height
      })

      assign(innerStyle, { width: hiddenSize.height })

      if (props.tabAlign != 'stretch'){
        style.height = innerSize.width
      } else {
        style.height = hiddenSize.width
      }

      notifier = <NotifyResize onResize={this.onInnerResize} notifyOnMount />

      if (props.tabAlign === 'stretch'){

        Factory = FlexiBox
        verticalFix = <div
          key="innerHidden"
          ref={(c) => this.innerHidden = c}
          className={join(innerClassName, bem('inner','hidden'))}
          style={assign({}, innerStyle, HIDDEN_STYLE)}
        >
          {children}
          <NotifyResize notifyOnMount onResize={this.onHiddenResize} />
        </div>
      }
    }

    const tabIndex = props.active && props.tabIndex != -1?
                      props.tabIndex:
                      null

    const renderProps = assign({}, props, {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: this.onKeyDown,
      style,
      tabIndex,
      disabled: null,
      className,
      [this.props.activateEvent || 'onClick']: this.onActivate
    })

    if (props.vertical && props.tabAlign === 'stretch'){
      return <Factory {...renderProps}>
      {({ width, height }) => {

        height = Math.max(height, hiddenSize.width)

        return [
          <div
            key="inner"
            ref={(c) => this.inner = c}
            className={innerClassName}
            style={assign(innerStyle, { width: height })}
          >
            {children}
            {notifier}
          </div>,

          verticalFix
        ]
      }}
      </Factory>
    }

    return <Factory {...renderProps}>
      <div
        ref="inner"
        className={innerClassName}
        style={innerStyle}
      >
        {children}
        {notifier}
      </div>

      {verticalFix}
    </Factory>
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

  onKeyDown(event){

    const key = event.key

    if (typeof this.props.onKeyDown == 'function'){
      this.props.onKeyDown(event)
    }

    let dir = 0

    if (key == 'ArrowLeft' || key == 'ArrowUp'){
      dir = -1
    } else if (key == 'ArrowRight' || key == 'ArrowDown'){
      dir = 1
    }

    if (dir){
      return this.props.onNavigate(dir)
    }

    if (key === 'Home'){
      return this.props.onNavigateFirst()
    }

    if (key == 'End'){
      return this.props.onNavigateLast()
    }

  }

  onFocus(event){
    this.setState({
      focused: true
    })

    this.props.onFocus(event)
  }

  onBlur(){
    this.setState({
      focused: false
    })

    this.props.onBlur(event)
  }

  componentDidUpdate(prevProps){
    if (this.props.active && !prevProps.active && this.props.tabIndex != -1){
      this.focus()
    }
  }

  onActivate(event){
    const eventName = this.props.activateEvent || 'onClick'

    if (typeof this.props[eventName] === 'function'){
      this.props[eventName](event)
    }

    !this.props.disabled && this.props.onActivate()
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
  onBlur: () => {},
  onFocus: () => {},
  onActivate: () => {},
  onNavigate: () => {},
  onNavigateFirst: () => {},
  onNavigateLast: () => {}
}
