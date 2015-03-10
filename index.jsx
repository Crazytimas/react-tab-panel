
'use strict';

var React    = require('react')
var TabPanel = require('./src')

// require('./index.styl')

var Cmp = React.createClass({

    getInitialState: function(){
        return {
            value: ''
        }
    },

    onChange: function(e) {
        this.setState({
            value: e.target.value
        })
    },
    render: function(){
        return <div style={this.props.style}>
            {this.props.children}
            <p>
            <input value={this.state.value} onChange={this.onChange} />
            </p>
        </div>
    }
})

var INDEX = 3
var App = React.createClass({

    getInitialState: function(){
        return {
        }
    },

    handleChange: function(index){
        INDEX = index
        this.setState({
            selectedIndex: index
        })
    },

    render: function() {
        var selectedIndex = this.state.selectedIndex

        function title(props){
            // props.style.background = ''
            // props.style.white = ''

            // props.title="test"
        }

        return <TabPanel
            enableScroll={true}
            defaultSelectedIndex={INDEX}
            xtabVerticalPosition='bottom'
            containerStyle={{padding: 30}}
            xstyle={{maxHeight: 400}}
            titleFactory={title}
        >
            <Cmp title="One">first
                Lorem ipsum Non ullamco tempor velit sit fugiat eiusmod eiusmod velit sed Ut voluptate et magna nisi sint nisi aute ea cupidatat veniam labore adipisicing aliquip enim enim eu ut dolore in aliqua laborum tempor occaecat irure irure sit occaecat esse deserunt labore exercitation adipisicing laborum velit non tempor qui sit occaecat velit consequat qui dolor adipisicing cupidatat laboris et Duis et aliqua amet cupidatat ad dolore irure laborum nostrud exercitation esse qui aute velit eu sit esse qui occaecat est ad mollit sit nisi ut proident laboris officia nulla cupidatat mollit exercitation labore laboris fugiat ullamco culpa Ut nulla labore non pariatur occaecat fugiat ullamco aute in mollit et aliquip fugiat non anim incididunt dolore irure est nisi proident non laborum reprehenderit sed in Duis labore ea do laborum irure cillum culpa minim cillum id sed officia labore Excepteur cillum non adipisicing dolore ex enim est ad ullamco qui ut labore commodo cupidatat dolore proident irure laborum adipisicing id aliquip cillum aliquip sed est incididunt occaecat aliqua sit ad enim aliquip ut enim velit veniam pariatur elit in velit labore consequat eiusmod consequat proident mollit qui aliquip in amet enim culpa labore irure adipisicing aliqua nostrud est mollit adipisicing ad enim exercitation consectetur sit nulla exercitation.
            </Cmp>
            <Cmp href="#two" title="Two">second
Lorem ipsum Proident ut pariatur sint laboris cillum exercitation reprehenderit magna elit ut anim ut velit laboris est sint laboris dolore aliqua proident eu sunt voluptate enim nulla sed id laborum reprehenderit sed reprehenderit elit cillum quis minim tempor eiusmod reprehenderit cillum non sit veniam id voluptate est culpa pariatur non exercitation aliqua incididunt ut anim do cupidatat deserunt ea officia quis sed occaecat consequat aute quis ullamco reprehenderit velit elit dolore eiusmod exercitation aliqua in pariatur ad labore ut sint laborum dolor minim eu eiusmod anim velit aute ex non adipisicing adipisicing ut velit eu quis aliqua aliquip pariatur consectetur magna in non fugiat ut reprehenderit magna nostrud nisi nulla labore reprehenderit in deserunt tempor cupidatat esse id sint anim ad sunt laborum fugiat esse eiusmod enim dolor esse enim mollit deserunt in quis incididunt irure commodo non qui voluptate voluptate eiusmod ullamco consectetur commodo incididunt ex anim in Ut pariatur irure Excepteur minim pariatur labore ea occaecat consectetur nulla id elit amet irure quis quis adipisicing incididunt magna cupidatat culpa dolor dolore Duis sint dolor ut enim Duis Ut consectetur commodo ullamco culpa nisi id esse fugiat ex laborum consequat esse voluptate et consectetur et Excepteur proident Ut reprehenderit sed voluptate irure fugiat.
            </Cmp>
            <Cmp title="Three" disabled={true}>third Lorem ipsum Velit laborum veniam adipisicing sed et adipisicing qui do aute laborum esse velit anim sit magna in ad veniam magna aliquip exercitation sed id ad irure dolore ad nulla cillum dolore ex voluptate laborum magna consequat incididunt ex culpa exercitation elit minim dolore qui amet dolor pariatur magna commodo reprehenderit fugiat non incididunt Duis labore Duis enim enim nisi Ut elit ut aliqua Excepteur fugiat in culpa in nisi enim et id laboris ut in dolor ut consequat aute enim incididunt pariatur ut culpa proident veniam laborum id dolore est id ullamco tempor incididunt exercitation laborum tempor irure do laborum aliquip velit culpa sunt ex dolor ex aliquip voluptate ullamco laborum et dolore proident reprehenderit est proident sit veniam nostrud sint labore minim culpa eiusmod non in aute fugiat esse aliqua laborum qui labore occaecat in fugiat nisi incididunt occaecat sint sit est in do eiusmod non ullamco exercitation enim ullamco irure adipisicing magna dolore laboris laborum dolore est irure velit elit et officia est est aliquip esse eiusmod officia aliquip in do adipisicing culpa ut dolore reprehenderit.</Cmp>
            <Cmp title="Four">four Lorem ipsum In proident reprehenderit sed in dolor Duis cillum esse dolor ullamco anim magna voluptate aliquip in in nostrud esse sint proident Excepteur officia eu anim officia Excepteur do in dolor nisi laboris minim id nulla anim occaecat consectetur ut labore cupidatat qui aliquip pariatur nisi elit ullamco dolore tempor dolore ex officia Excepteur fugiat ea amet nulla voluptate sunt reprehenderit sed velit ut laborum magna dolor in consequat labore eiusmod velit labore labore ex proident ut fugiat in aliqua non sint officia consectetur officia occaecat adipisicing velit cillum ex tempor ullamco tempor officia labore dolor in est esse do occaecat Ut et nulla aliquip sed consequat aliquip elit non sint Duis amet fugiat in Duis fugiat esse non ullamco do exercitation mollit anim id eu officia voluptate nulla cillum ullamco eu est qui sint tempor ea non sed qui anim cupidatat Ut ad aliquip reprehenderit Excepteur voluptate Ut sed commodo mollit cillum amet ea consequat aliquip nostrud culpa magna deserunt aliquip eu voluptate aliqua amet anim reprehenderit sit exercitation culpa dolor Duis in nostrud dolore anim do aute aliqua sit veniam in in Ut id aute sit eiusmod aliqua et Ut eu magna proident consectetur tempor aliqua incididunt dolor nisi dolore in laborum labore Excepteur nulla officia laborum fugiat laborum non anim aliquip pariatur labore ea consectetur nisi esse ut id eiusmod irure aliquip consequat Duis voluptate magna elit voluptate sed fugiat Duis minim quis dolore ad deserunt.</Cmp>
            <Cmp title="Five">five</Cmp>
            <Cmp title="Six">six</Cmp>
            <Cmp title="Seven">sevenup</Cmp>
        </TabPanel>
    }
})

React.render((
    <App />
), document.getElementById('content'))