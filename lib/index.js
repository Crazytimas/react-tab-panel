'use strict';

var React     = require('react')
var assign    = require('object-assign')

var Tabs      = require('react-basic-tabs/src')

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