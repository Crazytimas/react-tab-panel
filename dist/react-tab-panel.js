(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["TabPanel"] = factory(require("React"));
	else
		root["TabPanel"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React     = __webpack_require__(1)
	var assign    = __webpack_require__(2)

	var Tabs      = __webpack_require__(3)

	function emptyFn(){}

	// var ARROW_DEFAULTS = {
	//     color : 'rgb(237, 227, 227)',
	//     width : 6,
	//     height: 6
	// }

	// var DEFAULT_ARROW_STYLE = {
	//     top: '50%',
	//     left: '50%',
	//     display: 'inline-block',
	//     position: 'absolute',
	//     boxSizing: 'border-box',
	//     borderLeft: '0px solid transparent',
	//     borderRight: '0px solid transparent'
	// }

	// //default style for TabPanel
	// var DEFAULT_STYLE =  {
	//     display  : 'flex',
	//     flexFlow : 'column',
	//     boxSizing: 'border-box'
	// }

	var DISPLAY_NAME = 'ReactTabPanel'

	var TabPanel = React.createClass({

	    displayName: DISPLAY_NAME,

	    getDefaultProps: function() {
	        return {

	            'data-display-name': DISPLAY_NAME,

	            // defaultStripStyle: {
	            //     flex : 'none',
	            //     textOverflow: 'ellipsis',
	            //     overflow    : 'hidden',
	            //     whiteSpace  : 'nowrap'
	            // },

	            // defaultContainerStyle: {
	            //     flex: 1,
	            //     display: 'flex'
	            // },

	            // defaultSelectedStyle: {
	            //     overflow: 'auto'
	            // },

	            // scrollerFactory: function(props) {
	            //     var side = props.side
	            //     var style = assign({}, props.style)
	            //     var borderWidth = style.borderWidth

	            //     style.borderWidth = 0
	            //     style.borderStyle = 'solid'
	            //     style['border' + (side=='left'? 'Right': 'Left') + 'Width'] = borderWidth

	            //     var arrowStyle  = assign({}, DEFAULT_ARROW_STYLE, props.arrowStyle)

	            //     var arrowWidth  = props.arrowWidth  ||  arrowStyle.width || ARROW_DEFAULTS.width
	            //     var arrowHeight = props.arrowHeight || arrowStyle.height || ARROW_DEFAULTS.height
	            //     var arrowColor  = props.arrowColor || arrowStyle.color || ARROW_DEFAULTS.color

	            //     assign(arrowStyle, {
	            //         borderTop   : arrowHeight + 'px solid transparent',
	            //         borderBottom: arrowHeight + 'px solid transparent',
	            //         borderLeftWidth  : arrowWidth,
	            //         borderRightWidth : arrowWidth
	            //     })

	            //     if (side == 'right'){
	            //         arrowStyle.borderLeftColor = arrowColor
	            //     }

	            //     if (side == 'left'){
	            //         arrowStyle.borderRightColor = arrowColor
	            //     }

	            //     delete arrowStyle.width
	            //     delete arrowStyle.height

	            //     return (
	            //         <div {...props}>
	            //             <div className="arrow" data-side={side} style={arrowStyle} />
	            //         </div>
	            //     )
	            // },

	            // stripFactory: function(props, Strip) {
	            //     return (
	            //         <div key="stripWrap" style={{overflow: 'hidden'}}>
	            //             {Strip(props)}
	            //         </div>
	            //     )
	            // }
	        }
	    },

	    // prepareStyle: function(props){

	    //     var style = assign({}, DEFAULT_STYLE, props.style)

	    //     return normalize(style)
	    // },

	    render: function() {

	        // var props = this.prepareProps(this.props)

	        return React.createElement(Tabs, React.__spread({},  this.props))
	    }

	})

	module.exports = TabPanel

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React          = __webpack_require__(1)
	var assign         = __webpack_require__(2)

	var copyList       = __webpack_require__(4)
	var Strip          = __webpack_require__(5)
	var Container      = __webpack_require__(6)

	var normalize = __webpack_require__(8)

	var StripFactory     = React.createFactory(Strip)
	var ContainerFactory = React.createFactory(Container)

	var BASE_CLASS_NAME = __webpack_require__(7)
	var DISPLAY_NAME    = 'ReactBasicTabs'

	function emptyFn(){}

	var TabPanel = React.createClass({

	    displayName: DISPLAY_NAME,

	    propTypes: {
	        selectedIndex         : React.PropTypes.number,

	        //for panels
	        selectedStyle         : React.PropTypes.object,
	        selectedClassName     : React.PropTypes.string,

	        childrenStyle        : React.PropTypes.object,
	        childrenClassName    : React.PropTypes.string,

	        //for titles
	        titleStyle          : React.PropTypes.object,
	        titleClassName      : React.PropTypes.string,
	        selectedTitleStyle    : React.PropTypes.object,
	        selectedTitleClassName: React.PropTypes.string,

	        onSelect            : React.PropTypes.func,

	        stripListStyle  : React.PropTypes.object,
	        stripFactory    : React.PropTypes.func,
	        containerFactory: React.PropTypes.func,

	        //specify 'bottom' if you want to render the strip after the container
	        tabVerticalPosition   : React.PropTypes.string
	    },

	    getInitialState: function(){
	        return {
	            defaultSelectedIndex: this.props.defaultSelectedIndex
	        }
	    },

	    getDefaultProps: function(){
	        return {
	            'data-display-name': DISPLAY_NAME,

	            defaultStyle: {
	                display: 'flex',
	                flexFlow: 'column',
	                alignItems: 'stretch',

	                border: '1px solid rgb(218, 218, 218)',
	                color : 'rgb(120, 120, 120)'
	            },

	            //for panels
	            hiddenStyle: null,
	            hiddenClassName: null,

	            selectedStyle: {},
	            selectedClassName: 'selected',

	            //for titles
	            titleStyle: {},
	            titleClassName: '',
	            selectedTitleStyle: {},
	            selectedTitleClassName: 'selected',

	            tabVerticalPosition: 'top'
	        }
	    },

	    prepareChildren: function(props) {

	        var children = []

	        React.Children.forEach(props.children, function(child){
	            if (child != null && child != false){
	                children.push(child)
	            }
	        })

	        return children
	    },

	    prepareStyle: function(props) {
	        var style = assign({}, props.defaultStyle, props.style)

	        return normalize(style)
	    },

	    prepareSelectedIndex: function(props) {
	        var state         = this.state
	        var selectedIndex = props.selectedIndex

	        if (!props.hasOwnProperty('selectedIndex')){
	            selectedIndex = state.defaultSelectedIndex
	        }

	        selectedIndex = Math.min(selectedIndex, props.children.length - 1)

	        return selectedIndex
	    },

	    render: function(){

	        var props = assign({}, this.props)

	        props.style = this.prepareStyle(props)
	        props.children = this.prepareChildren(props)
	        props.selectedIndex = this.prepareSelectedIndex(props)

	        if (props.activeIndex != null){
	            console.warn('"activeIndex" is deprecated. Use "selectedIndex" instead!')
	        }

	        if (props.defaultActiveIndex != null){
	            console.warn('"defaultActiveIndex" is deprecated. Use "defaultSelectedIndex" instead!')
	        }
	        if (props.onChange != null){
	            console.warn('"onChange" is deprecated. Use "onSelect" instead!')
	        }

	        props.className = props.className || ''
	        props.className += ' ' + BASE_CLASS_NAME

	        var StripComponent     = this.renderStrip(props)
	        var ContainerComponent = this.renderContainer(props)

	        var Content = props.tabVerticalPosition == 'bottom'?
	                            [ContainerComponent, StripComponent]:
	                            [StripComponent, ContainerComponent]

	        var divProps = {
	            className: props.className,
	            style    : props.style
	        }

	        return (
	            React.createElement("div", React.__spread({},  divProps), 
	                Content
	            )
	        )
	    },

	    renderContainer: function(props) {
	        var containerProps = copyList(props, [
	                'children',
	                'selectedIndex',

	                'selectedClassName',
	                'selectedStyle',

	                'childrenStyle',
	                'childrenClassName',

	                'hiddenStyle',
	                'hiddenClassName'
	            ])

	        containerProps.style = props.containerStyle
	        containerProps.key = 'container'

	        if (props.containerFactory){
	            return props.containerFactory(containerProps, ContainerFactory)
	        }

	        return ContainerFactory(containerProps)
	    },

	    renderStrip: function(props){
	        var stripProps = copyList(props, [
	            'children',
	            'selectedIndex',

	            'selectedTitleStyle',
	            'selectedTitleClassName',

	            'disabledTitleStyle',
	            'disabledTitleClassName',

	            'focusedTitleStyle',
	            'focusedSelectedTitleStyle',
	            'focusedTitleClassName',

	            'anchorStyle',
	            'disabledAnchorStyle',
	            'focusedAnchorStyle',

	            'titleStyle',
	            'titleFactory',
	            'titleProps',
	            'enableScroll',

	            'scrollerProps',
	            'scrollerStyle',
	            'scrollStep',
	            'scrollSpeed',
	            'scrollerWidth',

	            'tabAlign'
	        ])

	        stripProps.style    = props.stripStyle
	        stripProps.position = props.tabVerticalPosition == 'bottom'? 'bottom': 'top'
	        stripProps.key      = 'strip'
	        stripProps.onSelect = this.handleSelect || emptyFn

	        if (props.stripFactory){
	            return props.stripFactory(stripProps, StripFactory)
	        }

	        return StripFactory(stripProps)
	    },

	    handleSelect: function(index){
	        if (!this.props.hasOwnProperty('selectedIndex')){
	            this.setState({
	                defaultSelectedIndex: index
	            })
	        }

	        ;(this.props.onSelect || emptyFn)(index)
	        ;(this.props.onChange || emptyFn)(index) //deprecated
	    }
	})

	TabPanel.Strip     = Strip
	TabPanel.Container = Container

	module.exports = TabPanel

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties named in the list, from source to destination
	 *
	 *      copyList({name: 'jon',age:5, year: 2006}, {}, ['name','age'])
	 *      // => {name: 'jon', age: 5}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Array} list the array with the names of the properties to copy
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, list){
	    if (arguments.length < 3){
	        list = destination
	        destination = null
	    }

	    destination = destination || {}
	    list        = list || Object.keys(source)

	    var i   = 0
	    var len = list.length
	    var propName

	    for ( ; i < len; i++ ){
	        propName = list[i]

	        if ( typeof source[propName] !== STR_UNDEFINED ) {
	            destination[list[i]] = source[list[i]]
	        }
	    }

	    return destination
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)
	var buffer = __webpack_require__(11)

	var BASE_CLASS_NAME = __webpack_require__(7)

	var TabTitle = __webpack_require__(9)
	var TabTitleFactory = React.createFactory(TabTitle)

	function emptyFn(){}

	function stop(event){
	    event.preventDefault()
	    event.stopPropagation()
	}

	var Scroller        = __webpack_require__(10)
	var ScrollerFactory = React.createFactory(Scroller)

	var DISPLAY_NAME = 'ReactBasicTabs.Strip'

	var TAB_ALIGN = {
	    left: 'flex-start',
	    center: 'center',
	    right: 'flex-end'
	}

	module.exports = React.createClass({

	    displayName: DISPLAY_NAME,

	    propTypes: {
	        selectedIndex    : React.PropTypes.number,
	        selectedStyle    : React.PropTypes.object,
	        selectedClassName: React.PropTypes.string,

	        titleStyle    : React.PropTypes.object,
	        titleClassName: React.PropTypes.string,

	        anchorStyle   : React.PropTypes.object,
	        scrollerStyle : React.PropTypes.object,
	        scrollerProps : React.PropTypes.object,
	        scrollerWidth : React.PropTypes.number,

	        scrollStep    : React.PropTypes.number,
	        scrollSpeed   : React.PropTypes.number

	        //each item in the TabPanel can also specify a titleStyle
	        //and a titleClassName, which are added to the values in props
	    },

	    getInitialState: function(){
	        return {
	            defaultSelectedIndex: this.props.defaultSelectedIndex,
	            adjustScroll: true,
	            scrollPos   : 0
	        }
	    },

	    componentWillUnmount: function(){
	        if (this.props.enableScroll){
	            window.removeEventListener('resize', this.onResizeListener)
	        }
	    },

	    componentDidMount: function(){
	        if (this.props.enableScroll){

	            setTimeout(function(){
	                this.adjustScroll()

	                window.addEventListener('resize', this.onResizeListener = buffer(this.onWindowResize, this.props.onWindowResizeBuffer, this))
	            }.bind(this), 0)
	        }
	    },

	    componentDidUpdate: function(){
	        this.props.enableScroll && this.adjustScroll()
	    },

	    onWindowResize: function(){
	        this.adjustScroll()
	        this.doScroll(0)
	    },

	    adjustScroll: function(){
	        if (!this.props.enableScroll){
	            return
	        }

	        if (!this.state.adjustScroll){
	            this.state.adjustScroll = true
	            return
	        }

	        var availableWidth = this.getAvailableStripWidth()
	        var listWidth      = this.getCurrentListWidth()

	        var state = {
	            adjustScroll  : false,
	            hasLeftScroll : false,
	            hasRightScroll: false
	        }

	        if (listWidth > availableWidth){
	            state.maxScrollPos = listWidth - availableWidth
	            state.hasLeftScroll  = this.state.scrollPos !== 0
	            state.hasRightScroll = this.state.scrollPos != state.maxScrollPos
	        } else {
	            state.maxScrollPos = 0
	            state.scrollPos    = 0
	        }

	        this.setState(state)
	    },

	    getCurrentListWidth: function(){
	        return this.refs.list.getDOMNode().offsetWidth
	    },

	    getAvailableStripWidth: function(){
	        var dom     = this.getDOMNode()
	        var domComputedStyle = window.getComputedStyle(dom)

	        var leftPadding  = parseInt(domComputedStyle.left, 10)
	        var rightPadding = parseInt(domComputedStyle.right, 10)

	        if (isNaN(leftPadding)){
	            leftPadding = 0
	        }
	        if (isNaN(rightPadding)){
	            rightPadding = 0
	        }

	        return dom.clientWidth - leftPadding - rightPadding
	    },

	    handleScrollLeft: function(event){
	        event.preventDefault()
	        this.handleScroll(-1)
	    },

	    handleScrollRight: function(event){
	        event.preventDefault()
	        this.handleScroll(1)
	    },

	    handleScrollLeftMax: function(event){
	        stop(event)
	        this.handleScrollMax(-1)
	    },

	    handleScrollRightMax: function(event){
	        stop(event)
	        this.handleScrollMax(1)
	    },

	    handleScrollMax: function(direction){
	        var maxPos = direction == -1?
	                        0:
	                        this.state.maxScrollPos

	        this.setScrollPosition(maxPos)
	    },

	    handleScroll: function(direction /*1 to right, -1 to left*/){
	        var mouseUpListener = function(){
	            this.stopScroll()
	            window.removeEventListener('mouseup', mouseUpListener)
	        }.bind(this)

	        window.addEventListener('mouseup', mouseUpListener)

	        this.scrollInterval = setInterval(this.doScroll.bind(this, direction), this.props.scrollSpeed)
	    },

	    doScroll: function(direction, step){
	        this.setState({
	            scrollDirection: direction
	        })

	        var newScrollPos = this.state.scrollPos + direction * (step || this.props.scrollStep)

	        this.setScrollPosition(newScrollPos)
	    },

	    setScrollPosition: function(scrollPos){
	        if (scrollPos > this.state.maxScrollPos){
	            scrollPos = this.state.maxScrollPos
	        }

	        if (scrollPos < 0){
	            scrollPos = 0
	        }

	        this.setState({
	            scrollPos: scrollPos,
	            scrolling : true
	        })
	    },

	    stopScroll: function(){
	        clearInterval(this.scrollInterval)

	        this.setState({
	            scrolling: false
	        })
	    },

	    getDefaultProps: function(){
	        return {
	            'data-display-name': DISPLAY_NAME,

	            tabAlign: 'left',

	            defaultStyle: {
	                boxSizing   : 'border-box',
	                display     : 'flex',
	                // flexFlow    : 'row'
	                textOverflow: 'ellipsis',
	                overflow    : 'hidden',
	                whiteSpace  : 'nowrap',
	                flex        : 'none',

	            },

	            border: '1px solid rgb(218, 218, 218)',

	            defaultTopStyle: {
	            },

	            defaultBottomStyle: {
	            },

	            onWindowResizeBuffer: 50,

	            scrollStep          : 5,
	            scrollSpeed         : 50,
	            scrollerWidth       : 10,
	            scrollerProps       : {},
	            scrollerStyle       : null,

	            enableScroll: false,
	            hasLeftScroll: false,
	            hasRightScroll: false,

	            defaultListStyle: {
	                margin   : 0,
	                padding  : 0,
	                flex: '1 0 auto',
	                listStyle: 'none',
	                position : 'relative',
	                boxSizing: 'border-box',
	                // display: 'inline-block',
	                verticalAlign: 'top',
	                display  : 'flex',
	                // flexFlow: 'row'
	            }
	        }
	    },

	    renderTitle: function(parentProps, classNameArray, titleStyle, child, index){
	        var selectedIndex = parentProps.selectedIndex || 0

	        var childProps = child.props
	        var title      = childProps.tabTitle || childProps.title
	        var disabled   = childProps.disabled

	        titleStyle = assign({},
	                        titleStyle,
	                        //ALLOW each item to also specify a titleStyle
	                        childProps.titleStyle
	                    )

	        //and a titleClassName
	        var titleClassName = classNameArray.concat(childProps.titleClassName || '')

	        // debugger
	        var titleProps = assign({
	            index   : index,
	            key     : index,
	            title   : title,
	            disabled: disabled,
	            selected: index === selectedIndex,
	            href    : childProps.href,

	            position: parentProps.position,
	            style: titleStyle,

	            selectedStyle    : parentProps.selectedTitleStyle,
	            selectedClassName: parentProps.selectedTitleClassName,

	            disabledStyle    : parentProps.disabledTitleStyle,
	            disabledClassName: parentProps.disabledTitleClassName,

	            focusedStyle        : parentProps.focusedTitleStyle,
	            focusedSelectedStyle: parentProps.focusedSelectedTitleStyle,
	            focusedClassName    : parentProps.focusedTitleClassName,

	            anchorStyle        : parentProps.anchorStyle,
	            disabledAnchorStyle: parentProps.disabledAnchorStyle,
	            focusedAnchorStyle : parentProps.focusedAnchorStyle,

	            className: titleClassName.join(' '),
	            onSelect : this.handleSelection.bind(this, disabled),

	            factory: parentProps.titleFactory

	        }, parentProps.titleProps)

	        var defaultFactory = TabTitleFactory
	        var factory = parentProps.titleFactory || defaultFactory

	        var result = factory(titleProps)

	        if (result === undefined){
	            result = defaultFactory(titleProps)
	        }

	        return result
	    },

	    prepareStyle: function(props) {
	        var defaultPositionStyle = props.position == 'top'? props.defaultTopStyle: props.defaultBottomStyle
	        var defaultStyle = assign({}, props.defaultStyle, defaultPositionStyle)

	        defaultStyle.justifyContent = TAB_ALIGN[props.tabAlign] || TAB_ALIGN.left

	        if (props.border){
	            var borderName = 'border' + (props.position == 'top'? 'Bottom':'Top')
	            defaultStyle[borderName] = defaultStyle[borderName] || props.border
	        }

	        var style = assign({}, defaultStyle, props.style)

	        style.position = 'relative'

	        return style
	    },

	    prepareClassName: function(props) {
	        var className = props.className || ''
	        className += ' ' + BASE_CLASS_NAME + '-strip'

	        return className
	    },

	    prepareListStyle: function(props) {
	        var defaultListStyle = assign({}, props.defaultListStyle)

	        defaultListStyle.justifyContent = TAB_ALIGN[props.tabAlign] || TAB_ALIGN.left

	        var listStyle = assign({}, defaultListStyle, props.listStyle)

	        if (this.state.scrollPos){
	            listStyle.left = -this.state.scrollPos
	        }

	        return listStyle
	    },

	    prepareListProps: function(props) {
	        var listStyle = this.prepareListStyle(props)
	        var children  = this.renderListChildren(props)

	        return {
	            style   : listStyle,
	            children: children
	        }
	    },

	    prepareProps: function(thisProps) {
	        var props = assign({}, thisProps)

	        props.className = this.prepareClassName(props)
	        props.style     = this.prepareStyle(props)

	        return props
	    },

	    renderListChildren: function(props) {
	        var titleStyle = assign({}, props.defaultTitleStyle, props.titleStyle)

	        var titleClassName = [props.titleClassName || '', BASE_CLASS_NAME + '-item-title']

	        return React.Children.map(props.children,
	                this.renderTitle.bind(this, props, titleClassName, titleStyle),
	                this
	            )
	    },

	    render: function(){

	        var props     = this.prepareProps(this.props)
	        var listProps = this.prepareListProps(props)

	        var scrollerLeft = this.renderScroller(-1)
	        var scrollerRight= this.renderScroller(1)

	        props.onScroll = this.onScroll

	        return (
	            React.createElement("nav", React.__spread({},  props), 
	                React.createElement("ul", React.__spread({ref: "list"},  listProps)), 
	                scrollerLeft, 
	                scrollerRight
	            )
	        )
	    },

	    onScroll: function(event){
	        var target = event.target

	        this.doScroll(1, target.scrollLeft)
	        target.scrollLeft = 0
	    },

	    handleSelection: function(disabled, index, event){
	        if (!disabled){
	            this.props.onSelect(index)
	        }
	    },

	    renderScroller: function(direction){

	        if (!this.props.enableScroll){
	            return
	        }

	        var onDoubleClick = direction == -1?
	                                this.handleScrollLeftMax:
	                                this.handleScrollRightMax

	        var onMouseDown = direction == -1?
	                            this.handleScrollLeft:
	                            this.handleScrollRight

	        var side    = direction == -1? 'left': 'right'
	        var visible = direction == -1?
	                            this.state.hasLeftScroll:
	                            this.state.hasRightScroll

	        return ScrollerFactory(assign({
	            factory      : this.props.scrollerFactory,
	            active       : this.state.scrollDirection == direction && this.state.scrolling,
	            onDoubleClick: onDoubleClick,
	            onMouseDown  : onMouseDown,
	            style        : this.props.scrollerStyle,
	            width        : this.props.scrollerWidth,
	            side         : side,
	            visible      : visible
	        }, this.props.scrollerProps))
	    }
	})


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)
	var cloneWithProps = __webpack_require__(12)
	var normalize = __webpack_require__(8)

	var BASE_CLASS_NAME = __webpack_require__(7)

	function notEmpty(x){
	    return !!x
	}

	module.exports = React.createClass({

	    displayName: 'ReactBasicTabs.Container',

	    propTypes: {
	        selectedIndex     : React.PropTypes.number,

	        childrenClassName : React.PropTypes.string,
	        childrenStyle     : React.PropTypes.object,


	        defaultHiddenStyle: React.PropTypes.object,
	        hiddenStyle       : React.PropTypes.object,
	        hiddenClassName   : React.PropTypes.string,

	        defaultSelectedStyle: React.PropTypes.object,
	        selectedStyle       : React.PropTypes.object,
	        selectedClassName   : React.PropTypes.string
	    },

	    getDefaultProps: function(){
	        return {
	            defaultStyle: {
	                flex: '1 1 auto',
	                overflow: 'auto'
	            },
	            selectedIndex: 0,

	            defaultSelectedStyle: {
	                overflow: 'auto'
	            },
	            selectedStyle: null,

	            defaultHiddenStyle: {
	                display: 'none'
	            },
	            hiddenStyle: null
	        }
	    },

	    prepareProps: function(thisProps) {
	        var props = assign({}, thisProps)

	        props.style     = this.prepareStyle(props)
	        props.className = this.prepareClassName (props)
	        props.children  = this.prepareChildren(props)

	        return props
	    },

	    prepareStyle: function(props) {
	        return normalize(assign({}, props.defaultStyle, props.style))
	    },

	    prepareClassName: function(props) {
	        var className = [
	                props.className,
	                BASE_CLASS_NAME + '-container'
	            ]

	        return className.filter(notEmpty).join(' ')
	    },

	    prepareChildren: function(props) {
	        return React.Children.map(this.props.children, this.renderItem, this)
	    },

	    render: function(){

	        var props = this.prepareProps(this.props)

	        return React.createElement("section", React.__spread({},  props))
	    },

	    renderItem: function(item, index){
	        var props = this.props
	        var selectedIndex = props.selectedIndex || 0

	        //make sure the wrapping article gets the correct style
	        //if it is the selected item
	        var style = {}
	        var className = BASE_CLASS_NAME + '-item '

	        if (index !== selectedIndex){
	            assign(style, props.defaultHiddenStyle, props.hiddenStyle)
	            className += props.hiddenClassName || ''
	        } else {
	            assign(style, props.defaultSelectedStyle, props.selectedStyle)
	            className += props.selectedClassName || ''
	        }

	        if (item && item.props){

	            var newProps = {}
	            var newPropsCount = 0

	            if (props.childrenStyle){
	                //default style for children
	                newProps.style = assign({}, item.props.style, props.childrenStyle)
	                newPropsCount++
	            }

	            if (props.childrenClassName){
	                //default className for children
	                newProps.className = item.props.className || ''
	                newPropsCount++
	            }

	            if (newPropsCount){
	                item = cloneWithProps(item, newProps)
	            }
	        }

	        return React.createElement("article", {"data-index": index, key: index, style: style, className: className}, 
	                    item
	                )
	    }
	})


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = 'basic-tabs'

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(13)
	var getPrefixed = __webpack_require__(14)

	var map      = __webpack_require__(15)
	var plugable = __webpack_require__(16)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){
		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)
	var normalize = __webpack_require__(8)

	function emptyFn(){}

	function notEmpty(x){return !!x}

	var DISPLAY_NAME = 'ReactBasicTabs.TabTitle'

	module.exports = React.createClass({

		displayName: DISPLAY_NAME,

		getDefaultProps: function(){
			return {
				'data-display-name': DISPLAY_NAME,

				defaultStyle: {
					flex: 'none',
					boxSizing: 'border-box',
					userSelect: 'none',
					display  : 'inline-block',
					cursor   : 'pointer',
					padding  : 5,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden'
				},

				defaultAnchorStyle: {
					color         : 'inherit',
					textDecoration: 'inherit',
					cursor        : 'inherit'
				},

				defaultDisabledStyle: {
					color: 'rgb(229, 229, 229)',
					cursor: 'default'
				},

				defaultFocusedStyle: {
					color: 'white',
					background: 'rgb(163, 200, 229)'
				},

				defaultSelectedStyle: {
				    //theme properties
				    background: 'rgb(103, 175, 233)',
				    color: 'white'
				},

				defaultFocusedSelectedStyle: {
					background: 'rgb(36, 138, 221)'
				},

				defaultActiveStyle: {
				    //theme properties
				    background: 'rgb(70, 157, 228)',
				    color: 'white'
				},

				defaultOverSelectedStyle: {
					color: 'white',
					background: 'rgb(90, 152, 202)' //pressed color
				},

				defaultOverStyle: {
				    //theme properties
				    background: 'rgb(118, 181, 231)',
				    color: 'white'
				},

				defaultFocusedAnchorStyle: {
					// outline: 'none'
				}
			}
		},

		getInitialState: function(){
			return {}
		},

		render: function(){

			var props = this.prepareProps(this.props)

			var defaultFactory = React.DOM.li
			var factory = props.factory || defaultFactory

			var result = factory(props)

			if (result === undefined){
				result = defaultFactory(props)
			}

			return result
		},

		prepareProps: function(thisProps) {
			var props = assign({}, thisProps)

			props.mouseOver = this.state.mouseOver
			props.focused   = this.state.focused
			props.active    = this.state.active
			props['data-selected'] = this.props.selected

			props.style     = this.prepareStyle(props)
			props.className = this.prepareClassName(props)

			props.onMouseDown = this.handleMouseDown.bind(this, props)
			props.onMouseUp   = this.handleMouseUp.bind(this, props)

			props.onMouseEnter = this.handleMouseEnter.bind(this, props)
			props.onMouseLeave = this.handleMouseLeave.bind(this, props)

			props.onFocus = this.handleFocus.bind(this, props)
			props.onBlur  = this.handleBlur.bind(this, props)

			props.onClick     = this.handleClick.bind(this, props)

			props.children = this.prepareChildren(props)

			return props
		},

		prepareClassName: function(props) {
			var className = [props.className]

			if (props.disabled){
				className.push(props.disabledClassName)
			}

			if (props.selected){
				className.push(props.selectedClassName)
			}

			if (props.focused){
				className.push(props.focusedClassName)
			}

			return className.filter(notEmpty).join(' ')
		},

		prepareStyle: function(props) {
			var style = assign({}, props.defaultStyle, props.style)

			var active   = props.active
			var over     = props.mouseOver
			var selected = props.selected
			var focused  = props.focused

			if (focused){
				assign(style, props.defaultFocusedStyle, props.focusedStyle)
			}

			if (over){
				assign(style, props.defaultOverStyle, props.overStyle)
			}

			if (selected){
				assign(style, props.defaultSelectedStyle, props.selectedStyle)
			}

			if (active){
				assign(style, props.defaultActiveStyle, props.activeStyle)
			}

			if (over && selected){
				assign(style, props.defaultOverSelectedStyle, props.overSelectedStyle)
			}

			if (focused && selected){
				assign(style, props.defaultFocusedSelectedStyle, props.focusedSelectedStyle)
			}

			if (active && selected){
				assign(style, props.defaultActiveSelectedStyle, props.activeSelectedStyle)
			}

			if (props.disabled){
				assign(style, props.defaultDisabledStyle, props.disabledStyle)
			}

			;(props.onStyleReady || emptyFn)(style, props)

			return normalize(style)
		},

		prepareChildren: function(props) {
			var children = props.children
			var anchorProps

			if (!children){
				children = this.prepareAnchor(props)
			}

			return children
		},

		prepareAnchor: function(props) {
			var disabledAnchorStyle
			var defaultDisabledAnchorStyle

			if (props.disabled){
				defaultDisabledAnchorStyle = props.defaultDisabledAnchorStyle
				disabledAnchorStyle = props.disabledAnchorStyle
			}

			var defaultFocusedAnchorStyle
			var focusedAnchorStyle

			if (props.focused){
				defaultFocusedAnchorStyle = props.defaultFocusedAnchorStyle
				focusedAnchorStyle = props.focusedAnchorStyle
			}

			var style = assign({},
							props.defaultAnchorStyle,
							defaultDisabledAnchorStyle,
							defaultFocusedAnchorStyle,
							props.anchorStyle,
							disabledAnchorStyle,
							focusedAnchorStyle
						)
			var anchorProps = {
				href: props.href || "#",
				style: style
			}

			if (props.disabled){
				anchorProps.tabIndex = -1
			}

			return React.createElement("a", React.__spread({},  anchorProps), props.title)
		},

		handleFocus: function(props, event){
			this.setState({
				focused: true
			})

			;(this.props.onFocus || emptyFn)(event)
		},

		handleBlur: function(props, event){
			this.setState({
				focused: false
			})

			;(this.props.onBlur || emptyFn)(event)
		},

		handleMouseUp: function(props, event) {

		    if (props.disabled){
		        return
		    }

		    this.setState({
		        active: false
		    })

		    window.removeEventListener('mouseup', this.handleMouseUp)

		    ;(this.props.onMouseUp || emptyFn)(event)
		},

		handleMouseDown: function(props, event) {

		    if (props.disabled){
		    	event.preventDefault()
		    	return
		    }

		    this.setState({
		        active: true
		    })

		    window.addEventListener('mouseup', this.handleMouseUp)

		    ;(this.props.onMouseDown || emptyFn)(event)
		},

		handleMouseEnter: function(props, event) {
			if (props.disabled){
				return
			}

			this.setState({
				mouseOver: true
			})

			;(this.props.onMouseEnter || emptyFn)(event)
		},

		handleMouseLeave: function(props, event) {
			if (props.disabled){
				return
			}

			this.setState({
				mouseOver: false
			})

			;(this.props.onMouseLeave || emptyFn)(event)
		},

		handleClick: function(props, event) {
			!props.href && event.preventDefault()

			if (!this.props.disabled){
				;(this.props.onSelect || emptyFn)(this.props.index)
			}
		}
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)

	var BASE_CLASS_NAME = __webpack_require__(7)

	function emptyFn(){}

	var Scroller = React.createClass({

	    displayName: 'ReactBasicTabs.Scroller',

	    getDefaultProps: function(){
	        return {
	            width: 5,

	            defaultStyle: {
				    top       : 0,
				    position  : 'absolute',
				    height    : '100%',
				    cursor    : 'pointer',
				    background: 'rgb(40, 117, 179)',
	                color: 'white',
	                display: 'flex',
	                flexFlow: 'column',
	                justifyContent: 'center',
	                fontSize: '1.2em',
	                textAlign: 'center'
				},

				defaultOverStyle: {
					background: 'rgb(90, 152, 202)'
				},

				defaultSelectedStyle: {
					background: 'rgb(82, 81, 81)'
				}
	        }
	    },

	    getInitialState: function() {
	    	return {}
	    },

	    handleMouseEnter: function(event) {
	    	this.setState({
	    		mouseOver: true
	    	})

	    	;(this.props.onMouseEnter || emptyFn)(event)
	    },

	    handleMouseLeave: function(event) {
	    	this.setState({
	    		mouseOver: false
	    	})

	    	;(this.props.onMouseLeave || emptyFn)(event)
	    },

	    prepareProps: function(thisProps) {
	    	var props = assign({}, thisProps)

			props.className = this.prepareClassName(props)
			props.style     = this.prepareStyle(props)

			props.onMouseEnter = this.handleMouseEnter
			props.onMouseLeave = this.handleMouseLeave

	    	return props
	    },

	    prepareStyle: function(props) {
	    	var defaultOverStyle
	    	var overStyle

	    	if (this.state.mouseOver){
				defaultOverStyle = props.defaultOverStyle
				overStyle        = props.overStyle
	    	}

	    	var defaultSelectedStyle
	    	var selectedStyle

	    	if (props.selected){
	    		defaultSelectedStyle = props.defaultSelectedStyle
	    		selectedStyle = props.selectedStyle
	    	}

	    	var style = assign({},
	    					props.defaultStyle,
	    					props.style,

	    					defaultOverStyle,
	    					overStyle,

	    					defaultSelectedStyle,
	    					selectedStyle
	    				)

	    	style.width = style.width || props.width
	    	style[props.side] = 0

	    	if (!props.visible){
	    	    style.display = 'none'
	    	}

	    	return style
	    },

	    prepareClassName: function(props) {
	    	var className = props.className || ''

	    	className += ' ' + BASE_CLASS_NAME + '-scroller ' + props.side

	    	if (props.selected && props.visible){
	    	    className += ' selected'
	    	}

	    	return className
	    },

	    render: function(){

	    	var props = this.prepareProps(this.props)

	        props.children = [props.side == 'left'? '‹': '›']

	        return props.factory?
	                    props.factory(props):
	                    React.createElement("div", React.__spread({},  props))
	    }
	})

	module.exports = Scroller

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var setImmediate   = global.setImmediate
	var clearImmediate = global.clearImmediate

	module.exports = function(fn, delay, scope){

	    var timeoutId = -1

	    return function(){

	        var self = scope || this
	        var args = arguments

	        if (delay < 0){
	            fn.apply(self, args)
	            return
	        }

	        var withTimeout = delay || !setImmediate
	        var clearFn = withTimeout?
	                        clearTimeout:
	                        clearImmediate
	        var setFn   = withTimeout?
	                        setTimeout:
	                        setImmediate

	        if (timeoutId !== -1){
	            clearFn(timeoutId)
	        }

	        timeoutId = setFn(function(){
	            fn.apply(self, args)
	            self = null
	        }, delay)
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React    = __webpack_require__(1)
	  , hasOwn   = Object.prototype.hasOwnProperty
	  , version  = React.version.split('.').map(parseFloat)
	  , RESERVED = {
	      className:  resolve(joinClasses),
	      children:   function(){},
	      key:        function(){},
	      ref:        function(){},
	      style:      resolve(extend)
	    };

	module.exports = function cloneWithProps(child, props) {
	  var newProps = mergeProps(props, child.props);

	  if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
	    newProps.children = child.props.children;

	  // < 0.11
	  if (version[0] === 0 && version[1] < 11)
	    return child.constructor.ConvenienceConstructor(newProps);
	  
	  // 0.11
	  if (version[0] === 0 && version[1] === 11)
	    return child.constructor(newProps);

	  // 0.12
	  else if (version[0] === 0 && version[1] === 12){
	    MockLegacyFactory.isReactLegacyFactory = true
	    MockLegacyFactory.type = child.type
	    return React.createElement(MockLegacyFactory, newProps);
	  }

	  // 0.13+
	  return React.createElement(child.type, newProps);

	  function MockLegacyFactory(){}
	}

	function mergeProps(currentProps, childProps) {
	  var newProps = extend(currentProps), key

	  for (key in childProps) {
	    if (hasOwn.call(RESERVED, key) )
	      RESERVED[key](newProps, childProps[key], key)

	    else if ( !hasOwn.call(newProps, key) )
	      newProps[key] = childProps[key];
	  }
	  return newProps
	}

	function resolve(fn){
	  return function(src, value, key){
	    if( !hasOwn.call(src, key)) src[key] = value
	    else src[key] = fn(src[key], value)
	  }
	}

	function joinClasses(a, b){
	  if ( !a ) return b || ''
	  return a + (b ? ' ' + b : '')
	}

	function extend() {
	  var target = {};
	  for (var i = 0; i < arguments.length; i++) 
	    for (var key in arguments[i]) if (hasOwn.call(arguments[i], key)) 
	      target[key] = arguments[i][key]   
	  return target
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(17)
	var properties       = __webpack_require__(18)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(19)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(20)
	var getPrefix    = __webpack_require__(21)
	var el           = __webpack_require__(22)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(21)
	var forcePrefixed = __webpack_require__(23)
	var el            = __webpack_require__(22)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (!(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                el.style[prefixed] = ''
	                el.style[prefixed] = prefixedValue

	                if (el.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(20)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(22)

	var PREFIX

	module.exports = function(key){

		if (PREFIX){
			return PREFIX
		}

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof el.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	if(!!global.document){
	  	el = global.document.createElement('div')
	}

	module.exports = el
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(20)
	var getPrefix    = __webpack_require__(21)
	var properties   = __webpack_require__(18)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }
/******/ ])
});
;