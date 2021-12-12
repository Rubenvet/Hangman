function guess() {
    let guessed = this.state.guessed.map(n, idx => (
        <Hangman key={idx}></Hangman>
    ))};
