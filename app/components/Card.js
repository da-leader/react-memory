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
    //this.setState({status:'flipped'}, this.props.check(this.props.name));
    this.props.flipCard(this.props.card);
    
  },
  
  render: function () {
    var isFlipped = this.props.card.flipped;
    var isLocked = this.props.card.locked;
    var cardClass;
    if (isFlipped) {
      cardClass = 'flipped'
    } else {
      cardClass = 'not-flipped'
    }

    if (isLocked) {
      cardClass = 'locked'
    }
    return (
    <li onClick={this.handleClick} className={cardClass}>
        {this.props.card.name}<br />
        {this.props.card.id}<br />
        <img src={this.props.card.src}/>
    </li>
    );
  }
});

module.exports = Card;