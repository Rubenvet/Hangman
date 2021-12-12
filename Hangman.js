import React, { Component } from "react";
import { randomWord } from './words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";




class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart() {
    this.setState({
      nWrong: 0, guessed: new Set(), answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const imgAlt = `${this.state.nWrong}/${this.props.maxWrong} guesses.`;
    const isWinner = this.guessedWord().join("") === this.state.answer;

    let gameState = this.generateButtons();

    if (isWinner) gameState = 'You win!'

    let display;
    if (this.props.maxWrong == this.state.nWrong) {
      display = <div>
        <p className='Hangman-word'>{this.state.answer}</p>
        <h5>You lose.</h5>
      </div>
    } else {
      display =
        <div>
          <p className='Hangman-word'>{this.guessedWord()}</p>
          {gameState}
        </div>
    }
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={imgAlt} />
        <h4>Guessed wrong: {this.state.nWrong}</h4>
        {display}
        <button id='reset' onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
