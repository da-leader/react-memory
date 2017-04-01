var React = require('react');
var Card = require('./Card');
var board =[];
var flipped = "first";

var Game = React.createClass({

   getInitialState: function() {
    return {
            matched:false,
            playerOne:0,
            playerTwo:0
    };
  },

  shuffle: function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
  componentWillMount: function () {
    var shuffledCards = this.shuffle(data.cards);
    console.log(shuffledCards);  
    board = this.renderCards(shuffledCards);
  },

  checkFlipped: function(name){
    console.log('props ' + name);
    console.log('var ' + flipped);
    if (flipped.localeCompare('first') != 0){
      if(name.localeCompare(flipped) == 0) {
        console.log('matched');
        flipped = "first";
        this.matched();

      }else{
        console.log('not matched');
        flipped = "first";
      }
    }
    else{
      console.log('first');
      flipped = name;
    }
  },

  matched: function(){
    //this.setState(prevState => { playerOne: prevState.playerOne + 1 });
    console.log('updating');
    this.updateBoard();
      
  },
  updateBoard: function(){
    var cards = document.getElementsByClassName("flipped");
    console.log(cards.length);
    console.log(cards);
    console.log('card1' +cards[0]);
    console.log('card2' +cards[1]);
    console.log('dcard1' + (document.getElementsByClassName("flipped"))[0]);
    console.log('dcard2' + (document.getElementsByClassName("flipped"))[1]);
    /*for(i = 0; i < cards.length; i++){
      console.log(i);
        cards[i].className += " locked";
    }*/
    console.log(cards);
  },

  renderCards: function (cardVals){
    return cardVals.map(function(card,idx){
        return (
        <Card key={idx} name={card.name} src={card.src} check={this.checkFlipped} />
        );
    },this);
  },
  
  render: function () {
    return <ul>{board}</ul>;
  }
});

module.exports = Game;