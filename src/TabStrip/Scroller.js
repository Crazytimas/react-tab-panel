import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'
import assign from 'object-assign'
import hasTouch from 'has-touch'
import { NotifyResize } from 'react-notify-resize'
import debounce from 'lodash.debounce'

import { Flex, Item } from 'react-flex'
import { Motion, spring } from 'react-motion';

import join from '../join'
import bemFactory from '../bemFactory'

const springConfig = [400, 50];

const CLASS_NAME = 'react-tab-panel__tab-strip-scroll-tool'

const bem = bemFactory(CLASS_NAME)
const m = (name) => bem(null, name)

const styles = {}

const ARROWS = {
  right: <svg className={join(bem('arrow'), bem('arrow', 'right'))} height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
    <path d="M0-.25h24v24H0z" fill="none"/>
  </svg>,

  left: <svg className={join(bem('arrow'), bem('arrow', 'left'))} height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
    <path d="M0-.5h24v24H0z" fill="none"/>
  </svg>,

  down: <svg className={join(bem('arrow'), bem('arrow', 'down'))} height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
    <path d="M0-.75h24v24H0z" fill="none"/>
  </svg>,

  up: <svg className={join(bem('arrow'), bem('arrow', 'up'))} height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
}

const emptyFn = () => {};
const stop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export default class Scroller extends Component {

  constructor(props){
    super(props)

    this.scrollInfo = {
      scrollPos: 0,
      adjustScroll: true,

      hasStartScroll: false,
      hasEndScroll: false,

      scrollerSize: {
        start: 0,
        end: 0
      }
    }

    this.state = {
      scrolling: false,
      activeScroll: 0
    }

    this.onResize = debounce(this.onResize, 50, { leading: false, trailing: true })
  }

  getOffsetSizeName(){
    const tabPosition = this.props.tabPosition

    return tabPosition == 'top' || tabPosition == 'bottom'?
      'offsetWidth':
      'offsetHeight'
  }

  getSizeName(){
    const tabPosition = this.props.tabPosition

    return tabPosition == 'top' || tabPosition == 'bottom'?
      'width':
      'height'
  }

  componentDidMount(){
    const name = this.getOffsetSizeName()

    this.scrollInfo.scrollerSize = {
      start: findDOMNode(this.refs.start)[name],
      end: findDOMNode(this.refs.end)[name]
    }

    this.syncScroll({ force: true })
  }

  onResize(){
    delete this.currentListSize
    delete this.availableSize

    this.syncScroll({ force: true })
  }

  syncScroll({ force } = {}){
    this.updateScrollInfo()
    this.doScroll(0, null, { force })
  }

  scrollIntoView(domNode){
    if (domNode){
      const rect = domNode.getBoundingClientRect()
      const mainRect = findDOMNode(this.wrapper || this).getBoundingClientRect()

      const { tabPosition } = this.props
      const startSideName = tabPosition == 'top' || tabPosition == 'bottom'?
        'left':
        'top'
      const endSideName = tabPosition == 'top' || tabPosition == 'bottom'?
        'right':
        'bottom'

      const startDiff = rect[startSideName] - mainRect[startSideName]
      const endDiff = rect[endSideName] - mainRect[endSideName]

      const scrollIntoViewOffset = this.props.scrollIntoViewOffset

      if (startDiff < 0){
        this.doScroll(-startDiff + scrollIntoViewOffset, -1)
      } else if (endDiff > 0){
        this.doScroll(endDiff + scrollIntoViewOffset, 1)
      }
    }
  }

  doScroll(direction, step, { force } = {}){
    const scrollInfo = this.scrollInfo

    const newScrollPos = scrollInfo.scrollPos + direction * (step || this.props.scrollStep)

    this.setScrollPosition(newScrollPos, { force })
  }

  scrollBy(offset, direction, { force } = {}){
    const scrollInfo = this.scrollInfo

    const newScrollPos = scrollInfo.scrollPos + direction * offset

    this.setScrollPosition(newScrollPos, { force })
  }

  onClick(direction){
    const offset = this.getAvailableSize()

    this.scrollBy(offset, direction)
  }

  setScrollPosition(scrollPos, { force } = {}){
    const scrollInfo = this.scrollInfo

    if (scrollPos > scrollInfo.maxScrollPos){
      scrollPos = scrollInfo.maxScrollPos;
    }

    if (scrollPos < 0){
      scrollPos = 0;
    }

    if (scrollPos === scrollInfo.scrollPos && force !== true){
      return
    }

    assign(scrollInfo, {

      hasStartScroll: scrollPos !== 0,
      hasEndScroll: scrollPos < scrollInfo.maxScrollPos,

      scrollPos
    });

    this.setState({})
  }

  updateScrollInfo(){

    const availableSize = this.getAvailableSize()
    const listSize = this.getCurrentListSize()

    const scrollInfo = assign(this.scrollInfo, {
      availableSize,
      listSize
    })

    if (listSize > availableSize){
      scrollInfo.maxScrollPos = listSize - availableSize
    } else {
      scrollInfo.maxScrollPos = 0
    }

    scrollInfo.hasStartScroll = scrollInfo.scrollPos != 0
    scrollInfo.hasEndScroll = scrollInfo.scrollPos < scrollInfo.maxScrollPos
  }

  handleScrollMax(direction, event){
    stop(event);

    const maxPos = direction == -1? 0: this.scrollInfo.maxScrollPos;

    this.setScrollPosition(maxPos);
  }

  startScroll(direction, event){

    stop(event);

    const eventName = hasTouch? 'touchend': 'mouseup';

    const mouseUpListener = () => {
      this.stopScroll();
      global.removeEventListener(eventName, mouseUpListener);
    };

    global.addEventListener(eventName, mouseUpListener);

    this.scrollInterval = global.setInterval(
      this.doScroll.bind(this, direction),
      this.props.scrollSpeed
    );

    this.setState({
      scrolling: true,
      activeScroll: direction
    });
  }

  stopScroll(){

    global.clearInterval(this.scrollInterval);

    this.setState({
      scrolling: false,
      activeScroll: 0
    });
  }

  renderScroller(direction){

    const { scroller, vertical, tabPosition } = this.props

    if (!scroller){
      return null
    }

    const directionName = vertical?
      (direction == -1? 'up': 'down'):
      (direction == -1? 'left': 'right')

    const arrowName = (tabPosition == 'top' || tabPosition == 'bottom')?
      (direction == -1? 'left': 'right'):
      (direction == -1? 'up': 'down')

    const behavior = typeof scroller === 'boolean'?
                      scroller? 'on': 'off'
                      :
                      'auto'

    const scrollInfo = this.scrollInfo
    const disabled = direction == -1?
      !scrollInfo.hasStartScroll:
      !scrollInfo.hasEndScroll;

    const className = join(
      CLASS_NAME,

      m(behavior),

      m(`direction-${arrowName}`),
      m(`tab-position-${tabPosition}`),

      this.state.activeScroll == direction?
        m('active'):
        '',

      scroller === 'auto' && disabled && m('hidden'),
      scroller === true && disabled && m('disabled')
    );

    const onClick = !disabled && this.props.scrollAllVisible?
                      this.onClick.bind(this, direction):
                      emptyFn;

    const onMouseDown = !disabled && !this.props.scrollAllVisible?
                          this.startScroll.bind(this, direction):
                          emptyFn;

    const onDoubleClick = !disabled?
                            this.handleScrollMax.bind(this, direction):
                            emptyFn;

    const scrollerProps = {
      ref: direction == -1? 'start': 'end',
      disabled,
      className,
      onClick,
      onMouseDown: !hasTouch && onMouseDown,
      onTouchStart: hasTouch && onMouseDown,
      onDoubleClick: onDoubleClick,
      children: ARROWS[arrowName]
    };

    let result

    if (this.props.renderScroller){
      result = this.props.renderScroller(scrollerProps);
    }

    if (result === undefined){
      result = <div {...scrollerProps} />;
    }

    return result;
  }

  /**
   * Cache the current list width on this instance.
   *
   * It will be invalidated by onResize
   *
   * @return {Number}
   */
  getCurrentListSize(){
    return this.currentListSize = this.currentListSize || findDOMNode(this.strip)[this.getOffsetSizeName()];
  }

  /**
   * Cache the available width on this instance.
   *
   * It will be invalidated by onResize
   *
   * @return {Number}
   */
  getAvailableSize(){
    return this.availableSize = this.availableSize || findDOMNode(this.wrapper || this)[this.getOffsetSizeName()];
  }

  render(){
    const props = this.props
    const { scroller, tabPosition } = props
    const scrollInfo = this.scrollInfo

    const scrollStyleName = (tabPosition == 'top' || tabPosition == 'bottom')? 'left': 'top'
    const style = {
      [scrollStyleName]: spring(-scrollInfo.scrollPos, springConfig)
    }

    const resizer = <NotifyResize key="resizer" onResize={this.onResize} />
    const children = [
      props.childProps.children,
      resizer
    ]

    return <Flex ref={null} {...props}>
      {resizer}

      {this.renderScroller(-1)}

      <Motion style={style}>
        {({[scrollStyleName]: scrollValue}) => {
          const contents = <Flex {...props.childProps} ref={(c) => this.strip = c} children={children} style={{[scrollStyleName]: scrollValue}}/>

          if (scroller === true){
            //always show
            return <Flex ref={(c) => this.wrapper = c} className={'react-tab-panel__tab-strip-scroll-wrap'} row flexGrow={1} flexShrink={1} wrap={false} alignItems="stretch">
              {contents}
            </Flex>
          }
          return contents
        }}
      </Motion>

      {this.renderScroller(1)}
    </Flex>
  }
}

Scroller.propTypes = {
  /**
   * When true, scrolling will only happen on click
   * and will scroll all visible tabs to a given direction
   *
   * When false, scrolling will happen on mouseDown
   *
   * @type {Boolean}
   */
  scrollAllVisible: PropTypes.bool,

  scroller: PropTypes.oneOf(['auto', false, true])
}

Scroller.defaultProps = {
  onScrollEnd: () => {},
  scrollStep: 5,
  scrollSpeed: 5,
  scrollIntoViewOffset: 50,
  onScrollerClick: () => {},
  onScrollEnd: () => {}
}
