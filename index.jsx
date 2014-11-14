
'use strict';

var React    = require('react')
var TabPanel = require('./src')

require('./index.styl')

var App = React.createClass({

    getInitialState: function(){
        return {
        }
    },

    handleChange: function(index){
        // this.setState({
        //     activeIndex: index
        // })
    },

    render: function() {
        var activeIndex = this.state.activeIndex

        return <TabPanel
            enableScroll={true}
            scrollStep={5}
            scrollSpeed={20}
            tabVerticalPosition={'bottom'}
            style={{width: '100%', border: '1px solid blue'}}
            defaultActiveIndex={activeIndex}
            onChange={this.handleChange}
            titleStyle={{padding: 10, border: '1px solid red'}}
            defaultStyle={{padding: 10}}
            stripStyle={{
            }}
        >
            <div title="One">first</div>
            <div title="Two">second</div>
            <div title="Three">third</div>
            <div title="Four">four</div>
            <div title="Five">five</div>
            <div title="Six">six</div>
            <div title="Seven">sevenup</div>
        </TabPanel>
    }
})

React.render((
    <App />
), document.getElementById('content'))