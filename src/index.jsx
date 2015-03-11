'use strict';

var React  = require('react')
var assign = require('object-assign')
var Tabs   = require('react-basic-tabs')

var DISPLAY_NAME = 'ReactTabPanel'

var TabPanel = React.createClass({

    displayName: DISPLAY_NAME,

    getDefaultProps: function() {
        return {
            'data-display-name': DISPLAY_NAME
        }
    },

    render: function() {
        return <Tabs {...this.props} />
    }

})

module.exports = TabPanel