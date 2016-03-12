# react-tab-panel

> React Tab Panel

## Usage

```jsx
import TabPanel from 'react-tab-panel'

<TabPanel>
  
</TabPanel>
```

This component is a very simple yet powerful tab panel. You only have to require it (there are no css files involved).

For flexibility it leaves styling up to the end-user. (It does render html with some css class names, so you can use those to style your component).

## Install

```sh
$ npm install react-tab-panel
```

## Features

 - tab scrolling (use enableScroll: true)
 - complete control over styling
 - clean design
 - keyboard-navigateable

## Usage

```jsx
var React    = require('react')
var TabPanel = require('react-tab-panel')

var App = React.createClass({

    getInitialState: function(){
        return {
            activeIndex: 1
        }
    },

    handleChange: function(index){
        this.setState({
            activeIndex: index
        })
    },

    render: function() {
        return (
            <TabPanel activeIndex={this.state.activeIndex}
                onChange={this.handleChange}
                titleStyle={{padding: 10}}
            >
                <div title="One">first</div>
                <div title="Two">second</div>
                <div title="Three">third</div>
            </TabPanel>
        )
    }
})

React.render(<App />, document.body)
```

## Properties

The TabPanel supports the following props:

 * activeIndex: Number - the index of the TabPanel children to be rendered as active - NOTE: When setting this option, you have to listen for onChange, and re-render the tabpanel (CONTROLLED behaviour)

 * defaultActiveIndex: Number - the index of the TabPanel. When clicking on a tab, the panel manages the active index internally, and you are shown the clicked tab (UNCONTROLLED behaviour)

 * enableScroll: Boolean (defaults to false) - Whether to show scroll to tab titles when they don't have enough space

 * onChange: Function(index) - the function to be called when the user selects another tab to be the active tab. The first param is the new activeIndex to be set

 * tabVerticalPosition: String - can be 'top' or 'bottom'

 * titleStyle: Object - style to be applied to tab titles
 * defaultStyle: Object - style to be applied to every tab in the tabpanel.

 * stripStyle: Object - a style object for the tab title strip

 * scrollStep: Number (defaults to 5) - the scroll step size
 * scrollSpeed: Number (defaults to 20) - used when holding mouse down on scroll. Every **scrollSpeed** milliseconds we scroll **scrollStep** pixels


For tab titles, the children of the TabPanel are expected to have have either a **title** property, or a **tabTitle** property (the tabTitle property has higher priority, and will be used if specified as a truthy value).

Other useful props:

 * scrollerProps: Object
        Example:

        scrollerProps = {
            arrowStyle: {
                color: 'magenta',
                width: 10,
                height: 5
            },
            width: 10, //defaults to 8
            style: {background: 'blue', borderWidth: 2, borderColor: 'gray'}
        }

## Styling

For styling, the following classes are present in the rendered html:

 * 'basic-tabs' - className for the React component.
 * 'basic-tabs-strip' - the nav element containing the tab titles
 * 'basic-tabs-item-title' - a **li** with the title of each tab
 * 'basic-tabs-item-title.active' - the active version of the above
 * 'basic-tabs-container' - the body of the tab panel
 * 'basic-tabs-item' - html **article** tags inside the .basic-tabs-container. Those hold the actual children of the tab panel
 * 'basic-tabs-item.active' - the active version of the above
