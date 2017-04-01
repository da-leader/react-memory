var React = require('react');
var Card = React.createClass({
  
  getInitialState: function(){
    return {
      status:'notFlipped'
    };
  },

  test: function(){
    return {
      val:'notflipped'
    }
  },

  handleClick: function(){
    this.setState({status:'flipped'}, this.props.check(this.props.name));
    
  },
  
  render: function () {
    return (
    <li onClick={this.handleClick} className={this.state.status}>
        {this.props.name}<br />
        <img src={this.props.src}/>
    </li>
    );
  }
});

module.exports = Card;