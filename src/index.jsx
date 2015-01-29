'use strict';

var React = require('react')
var Tabs  = require('react-basic-tabs')
var assign = require('object-assign')
var TabsFactory = React.createFactory(Tabs)
var prefixer = require('react-prefixr')

var ARROW_DEFAULTS = {
    color : 'rgb(237, 227, 227)',
    width : 6,
    height: 6
}

function emptyFn(){}

var TabPanel = React.createClass({

    displayName: 'TabPanel',

    getDefaultProps: function() {
        return {
            defaultStripStyle: {
                flex : 'none',
                textOverflow: 'ellipsis',
                overflow    : 'hidden',
                whiteSpace  : 'nowrap'
            },

            defaultContainerStyle: {
                flex: 1,
                display: 'flex'
            },
            defaultActiveStyle: {
                overflow: 'auto'
            },

            scrollerFactory: function(props, side) {
                var style = assign({}, props.style)
                var borderWidth = style.borderWidth

                style.borderWidth = 0
                style.borderStyle = 'solid'
                style['border' + (side=='left'? 'Right': 'Left') + 'Width'] = borderWidth

                var arrowStyle  = assign({}, props.arrowStyle)
                var arrowWidth  = props.arrowWidth  ||  arrowStyle.width || ARROW_DEFAULTS.width
                var arrowHeight = props.arrowHeight || arrowStyle.height || ARROW_DEFAULTS.height
                var arrowColor  = props.arrowColor || arrowStyle.color || ARROW_DEFAULTS.color

                assign(arrowStyle, {
                    borderTop   : arrowHeight + 'px solid transparent',
                    borderBottom: arrowHeight + 'px solid transparent',
                    borderLeftWidth  : arrowWidth,
                    borderRightWidth : arrowWidth
                })

                if (side == 'right'){
                    arrowStyle.borderLeftColor = arrowColor
                }

                if (side == 'left'){
                    arrowStyle.borderRightColor = arrowColor
                }

                delete arrowStyle.width
                delete arrowStyle.height

                return (
                    <div {...props}>
                        <div className="arrow" data-side={side} style={arrowStyle} />
                    </div>
                )
            },

            stripFactory: function(props, Strip) {
                return (
                    <div key="stripWrap" style={{overflow: 'hidden'}}>
                        {Strip(props)}
                    </div>
                )
            }
        }
    },

    getInitialState: function() {
        return {

        }
    },

    prepareStyle: function(props){
        var style = {}

        assign(style, {
            display : 'flex',
            flexFlow: 'column'
        }, props.style)

        return prefixer(style)
    },

    render: function() {
        var props = assign({}, this.props)

        props.onChange = this.handleChange
        props.style = this.prepareStyle(props)

        this.prepareIndex(props, this.state)

        if (props.arrowColor){
            props.scrollerProps = props.scrollerProps || {}
            props.scrollerProps.arrowColor = props.arrowColor
        }

        props.containerStyle = assign({}, props.defaultContainerStyle, props.containerStyle)
        props.stripStyle = assign({}, props.defaultStripStyle, props.stripStyle)

        return TabsFactory(props)
    },

    prepareIndex: function(props, state) {
        if (props.hasOwnProperty('defaultActiveIndex')){
            props.activeIndex = props.defaultActiveIndex
            if (typeof state.activeIndex != 'undefined'){
                props.activeIndex = state.activeIndex
            }
        }
    },

    handleChange: function(index) {
        if (this.props.hasOwnProperty('defaultActiveIndex')){
            this.setState({
                activeIndex: index
            })
        }

        ;(this.props.onChange || emptyFn)(index)
    }

})

module.exports = TabPanel