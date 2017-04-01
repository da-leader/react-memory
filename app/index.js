var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var Game = require('./components/Game');

ReactDOM.render(
    <Game />,
    document.getElementById('app')
);