var React = require('react');
var Card = require('./Card');
//var board =[];
//var flipped = "first";

var Game = React.createClass({

   getInitialState: function() {
    return {
            playerOne:0,
            playerTwo:0,
            cardVals: this.shuffle(data.cards),
            activePlayer: 1,
            gameOver: false
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
    // var shuffledCards = this.shuffle(data.cards);
    // console.log(shuffledCards);  
    // board = this.renderCards(shuffledCards);
  },

  componentWillUpdate: function() {
    console.log("state", this.state);
  },

  flipCard: function(card) {
    this.setState({
      cardVals: this.state.cardVals.map(function(item) {
        if (card.id === item.id) {
          item.flipped = true;
        }
        return item;
      })
    });

    var flippedCards = this.state.cardVals.filter(function(item) {
      if (item.flipped) {
        return item;
      }
    });

    if (flippedCards.length === 2) {
      this.compareCards(flippedCards[0], flippedCards[1]);
    }

    var lockedCards = this.state.cardVals.filter(function(item) {
      if (item.locked) {
        return item;
      }
    });

    if (lockedCards.length === this.state.cardVals.length) {
      this.showEndGame();
    }
  },

  showEndGame: function() {
    this.setState({
      gameOver: true
    })
  },

  resetGame: function() {
    this.setState({
      cardVals: this.state.cardVals.map(function(item) {
        item.flipped = false;
        item.locked = false;
        return item;
      }),
      playerOne: 0,
      playerTwo: 0,
      activePlayer: 1,
      gameOver: false
    });
  },

  compareCards: function(card1, card2) {
    if (card1.name === card2.name) {
      this.matched();
    } else {
      this.updateBoard();

      if (this.state.activePlayer === 1) {
        this.changePlayer(2);
      } else if (this.state.activePlayer === 2) {
        this.changePlayer(1);
      }
    }
  },

  matched: function(){
    if (this.state.activePlayer === 1) {
      var score = this.state.playerOne + 1;
      this.setState({
        playerOne: score
      })
    }

    if (this.state.activePlayer === 2) {
      var score = this.state.playerTwo + 1;
      this.setState({
        playerTwo: score
      })
    }

    this.lockCards();  
  },

  lockCards: function() {
    this.setState({
      cardVals: this.state.cardVals.map(function(item) {
        if (item.flipped) {
          item.locked = true;
          item.flipped = false;
        }
        return item;
      })
    });
  },

  changePlayer: function(player) {
    this.setState({
      activePlayer: player
    })
  },

  updateBoard: function(){
    this.setState({
      cardVals: this.state.cardVals.map(function(item) {
        item.flipped = false;
        return item;
      })
    });
  },

  render: function (){
    console.log('im rendering', this.state.playerOne);
    if (this.state.gameOver) {
      var winner;
      if (this.state.playerOne > this.state.playerTwo) {
        winner = 1;
      }

      if (this.state.playerOne < this.state.playerTwo) {
        winner = 2;
      }

      if  (this.state.playerOne === this.state.playerTwo) {
        winner = 0;
      }
      return (
        <div>
          Spelare nummer {winner} vann spelet.
          <br />
          <button type="button" onClick={this.resetGame}>Spela igen?</button>
        </div>
      )
    }

    return (
      <div>
        <h2>Det är spelare nummer {this.state.activePlayer} tur.</h2>
        <ul>
        {this.state.cardVals.map(function(card,idx){
          return (
          <Card key={idx} card={card} check={this.checkFlipped} flipCard={this.flipCard} />
          );
      },this)
      }
      </ul>
        <div>
          <h3>Poäng</h3>
          <ul>
            <li>
              Spelare 1: {this.state.playerOne}
            </li>
            <li>
              Spelare 2: {this.state.playerTwo}
            </li>
          </ul>
        </div>
    </div>);
  }
  
  // render: function () {
  //   return <ul>{board}</ul>;
  // }
});

module.exports = Game;