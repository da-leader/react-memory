var React = require('react');

var App = React.createClass({
    render:function(){
        console.log(data);
        console.log(data.animal[1].name);
        return <h1>Det funkar fanimej</h1>
    }
});
module.exports = App;