import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import { NotifyResize } from 'react-notify-resize'
import join from '../join'

const emptyFn = () => null

const DivFactory = (props) => <div {...props} />

export default class FlexiBox extends Component {

  constructor(props){
    super(props)

    this.state = {
      width: null,
      height: null
    }

    this.mounted = false
  }

  render(){
    const { props } = this
    const style = assign({}, props.style)

    if (!style.position || style.position === 'static'){
      style.position = 'relative'
    }

    const Factory = props.factory || DivFactory
    const render = props.children

    return <Factory {...props} factory={null} children={null}>
      {render(this.state)}
      <NotifyResize onResize={this.onResize} notifyOnMount/>
    </Factory>
  }

  onResize({ width, height }){
    if (!this.mounted){
      this.mounted = true
    }

    this.setState({
      width, height
    })
  }

}

FlexiBox.propTypes = {
  factory: PropTypes.func,
  children: PropTypes.func
}
