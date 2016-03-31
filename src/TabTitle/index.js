import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from '../join'

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
      style: {},
      size: {},
      innerSize: {},
      innerHiddenSize: {}
    }
  }

  render(){

    const { props } = this
    const { index, tabStyle } = props

    const className = join(
      props.className,
      'react-tab-panel__tab-title',

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

    const renderProps = assign({}, props, {
      style,
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

  getNodeSize(node){
    if (!node){
      return {}
    }
    const rect = node.getBoundingClientRect()
    return {
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height)
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
  onActivate: () => {}
}
