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

      hasLeftScroll: false,
      hasRightScroll: false,

      scrollerSize: {
        left: 0,
        right: 0
      }
    }

    this.state = {
      scrolling: false,
      activeScroll: 0
    }

    this.onResize = debounce(this.onResize, 50, { leading: false, trailing: true })
  }

  componentDidMount(){
    this.scrollInfo.scrollerSize = {
      left: findDOMNode(this.refs.left).offsetWidth,
      right: findDOMNode(this.refs.right).offsetWidth
    }

    this.syncScroll({ force: true})
  }

  onResize(){
    delete this.currentListWidth
    delete this.availableWidth

    this.syncScroll({ force: true })
  }

  syncScroll({ force } = {}){
    this.updateScrollInfo()
    this.doScroll(0, null, { force })
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
    const offset = this.getAvailableWidth()

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

      hasLeftScroll: scrollPos !== 0,
      hasRightScroll: scrollPos < scrollInfo.maxScrollPos,

      scrollPos
    });

    this.setState({})
  }

  updateScrollInfo(){

    const availableWidth = this.getAvailableWidth();
    const listWidth = this.getCurrentListWidth();

    const scrollInfo = assign(this.scrollInfo, {
      availableWidth,
      listWidth
    })

    if (listWidth > availableWidth){
      scrollInfo.maxScrollPos = listWidth - availableWidth + (this.props.scroller === 'auto'? scrollInfo.scrollerSize.right: 0);
    } else {
      scrollInfo.maxScrollPos = 0;
    }

    scrollInfo.hasLeftScroll = scrollInfo.scrollPos != 0
    scrollInfo.hasRightScroll = scrollInfo.scrollPos < scrollInfo.maxScrollPos
  }

  handleScrollMax(direction, event){
    stop(event);

    const maxPos = direction == -1? 0: this.scrollInfo.maxScrollPos;

    this.setScrollPosition(maxPos);
  }

  startScroll(direction, event){

    console.log('start scroll ', direction)
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

    const scroller = this.props.scroller

    if (!scroller){
      return null
    }

    const behavior = typeof scroller === 'boolean'?
                      scroller? 'on': 'off'
                      :
                      'auto'

    const scrollInfo = this.scrollInfo
    const disabled = direction == -1?
      !scrollInfo.hasLeftScroll:
      !scrollInfo.hasRightScroll;


    const className = join(
      CLASS_NAME,

      `${CLASS_NAME}--${behavior}`,

      direction == -1 ?
        `${CLASS_NAME}--left`:
        `${CLASS_NAME}--right`,

      this.state.activeScroll == direction?
        `${CLASS_NAME}--active`:
        '',

      scroller === 'auto' && disabled && `${CLASS_NAME}--hidden`,
      scroller === true && disabled && `${CLASS_NAME}--disabled`
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

    const directionName = direction == -1? 'left': 'right'

    const scrollerProps = {
      ref: directionName,
      disabled,
      className,
      onClick,
      onMouseDown: !hasTouch && onMouseDown,
      onTouchStart: hasTouch && onMouseDown,
      onDoubleClick: onDoubleClick,
      children: ARROWS[directionName]
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
  getCurrentListWidth(){
    return this.currentListWidth = this.currentListWidth || findDOMNode(this.strip).offsetWidth;
  }

  /**
   * Cache the available width on this instance.
   *
   * It will be invalidated by onResize
   *
   * @return {Number}
   */
  getAvailableWidth(){
    return this.availableWidth = this.availableWidth || findDOMNode(this.wrapper || this).offsetWidth;
  }

  render(){
    const props = this.props
    const { scroller } = props
    const scrollInfo = this.scrollInfo

    const style = {
      left: spring(-scrollInfo.scrollPos, springConfig)
    }

    const resizer = <NotifyResize key="resizer" onResize={this.onResize} />
    const children = [
      props.childProps.children,
      resizer
    ]

    return <Flex {...props}>
      {resizer}

      {this.renderScroller(-1)}

      <Motion style={style}>
        {({left}) => {
          const contents = <Flex {...props.childProps} ref={(c) => this.strip = c} children={children} style={{left}}/>

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
  onScrollerClick: () => {},
  onScrollEnd: () => {}
}
