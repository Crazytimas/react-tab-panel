import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from '../join'
import assignDefined from '../assignDefined'

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
  height: 'auto'
}

export default class TabTitle extends Component {

  constructor(props){
    super(props)

    this.state = {
      focused: false,
      style: {},
      size: {},
      innerSize: {},
      innerHiddenSize: {}
    }
  }

  focus(){
    findDOMNode(this).focus()
  }

  render(){

    const { props } = this
    const { index, tabStyle } = props

    const className = join(
      props.className,
      'react-tab-panel__tab-title',

      this.state.focused && 'react-tab-panel__tab-title--focused',
      props.vertical && 'react-tab-panel__tab-title--vertical',
      props.active && 'react-tab-panel__tab-title--active',

      props.beforeActive && 'react-tab-panel__tab-title--before-active',
      props.afterActive && 'react-tab-panel__tab-title--after-active',

      props.disabled && 'react-tab-panel__tab-title--disabled',
      props.tabEllipsis && 'react-tab-panel__tab-title--ellipsis'
    )

    const innerClassName = join(
      'react-tab-panel__tab-title-inner',
      props.active && 'react-tab-panel__tab-title-inner--active',
      props.tabEllipsis && 'react-tab-panel__tab-title-inner--ellipsis'
    )

    const children = (props.tabTitle !== undefined?
                        props.tabTitle:
                        props.children) || '\u00a0'

    const {
      innerSize,
      innerHiddenSize
    } = this.state

    let innerStyle = (
      typeof tabStyle == 'function'?
        tabStyle(props):
        tabStyle
      ) || {}

    let style = props.style

    let verticalFix
    let notifier

    //HAIRY LOGIC - all needed for vertical tabs!
    if (props.vertical){

      //compute style
      style = assign({}, props.style, {
        width: innerSize.height
      })

      if (props.tabAlign != 'stretch'){
        style.height = innerSize.width
      }

      //compute innerStyle
      innerStyle = assign({}, innerStyle, { width: innerHiddenSize.width })

      notifier = <NotifyResize onResize={this.onResize} />

      if (props.tabAlign === 'stretch'){

        verticalFix = <div
          ref="innerHidden"
          className={join(innerClassName, 'react-tab-panel__tab-title-inner--hidden')}
          style={assign({}, innerStyle, HIDDEN_STYLE)}
        >
          {children}
          {notifier}
        </div>
      }
    }

    const tabIndex = props.active && props.tabIndex != null?
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


    return <div {...renderProps} >
      <div
        ref="inner"
        className={innerClassName}
        style={innerStyle}
      >
        {children}
        {notifier}
      </div>

      {verticalFix}
    </div>
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

  onFocus(){
    this.setState({
      focused: true
    })
  }

  onBlur(){
    this.setState({
      focused: false
    })
  }

  getNodeSize(node){
    if (!node){
      return {}
    }
    const rect = node.getBoundingClientRect()

    return {
      width: rect.width,
      height: rect.height
    }
  }

  getInnerSize(){
    return this.getNodeSize(findDOMNode(this.refs.inner))
  }

  getInnerHiddenSize(){
    return this.getNodeSize(findDOMNode(this.refs.innerHidden))
  }

  componentDidMount(){
    this.computeSize()
  }

  componentDidUpdate(prevProps){
    if (this.props.active && !prevProps.active && this.props.tabIndex != null){
      this.focus()
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.vertical != this.props.vertical
      ||
      newProps.tabAlign != this.props.tabAlign
    ){
      setTimeout(() => this.computeSize())
    }
  }

  onResize(){
    this.computeSize()
  }

  computeSize(){
    if (this.props.vertical){

      const innerSize = invert(this.getInnerSize())
      const innerHiddenSize = invert(this.getInnerHiddenSize())

      this.setState({
        innerSize,
        innerHiddenSize
      })

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
  activateEvent: PropTypes.oneOf(['onClick', 'onMouseEnter', 'onMouseDown']),
  onActivate: PropTypes.func
}

TabTitle.defaultProps = {
  onActivate: () => {},
  onNavigate: () => {},
  onNavigateFirst: () => {},
  onNavigateLast: () => {}
}
