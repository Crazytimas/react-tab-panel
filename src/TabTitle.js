import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from './join'

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

    const {
      innerSize,
      innerHiddenSize
    } = this.state

    const innerStyle = (typeof tabStyle == 'function'?
                    tabStyle(props):
                    tabStyle) || {}

    const style = assign({}, props.style, {
      width: innerSize.height
    })

    console.log(innerSize.width)
    // debugger

    const children = (props.tabTitle !== undefined?
                        props.tabTitle:
                        props.children) || '\u00a0'


    let verticalFix
    let notifier
    if (props.vertical){

      notifier = props.vertical && <NotifyResize onResize={this.onResize} />
      verticalFix = <div
        ref="innerHidden"
        className={join(innerClassName, 'react-tab-panel__tab-title-inner--hidden')}
        style={assign({}, innerStyle, HIDDEN_STYLE)}
      >
        {children}
        {notifier}
      </div>
    }

    return <div
      {...props}
      style={style}
      disabled={null}
      className={className}
      onClick={this.onClick}
    >
      <div ref="inner" className={innerClassName} style={assign({}, innerStyle, {width: innerHiddenSize.width})}>
        {children}
        {notifier}
      </div>

      {verticalFix}
    </div>
  }

  getNodeSize(node){
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

  onResize(){
    this.computeSize()
  }

  computeSize(){
    if (this.props.vertical){

      const innerSize = invert(this.getInnerSize())
      const innerHiddenSize = invert(this.getInnerHiddenSize())

      console.log(innerSize, innerHiddenSize)
      // debugger
      this.setState({
        innerSize,
        innerHiddenSize
      })

    }
  }

  onClick(event){
    this.props.onClick(event)

    !this.props.disabled && this.props.onActivate()
  }
}

TabTitle.propTypes = {
  tabEllipsis: PropTypes.bool
}

TabTitle.defaultProps = {
  onClick: () => {},
  onActivate: () => {}
}
