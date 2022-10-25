import { useState } from 'react';

const App = () => {
  const ANECDOTES = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(ANECDOTES);

  const selectRandomAncedote = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length);
    if (randIndex === selected) {
      selectRandomAncedote();
    } else {
      setSelected(randIndex);
    }
  };

  const handleVote = (ancedoteIndex) => {
    setAnecdotes(
      anecdotes.map((anecdote, index) => {
        if (index === ancedoteIndex) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }

        return anecdote;
      })
    );
  };

  const highestRatedAnecdote = (() => {
    let max = anecdotes[0];

    for (let index = 1; index < anecdotes.length; index++) {
      if (anecdotes[index].votes > max.votes) {
        max = anecdotes[index];
      }
    }

    return max;
  })();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={anecdotes[selected]}
        onVote={() => handleVote(selected)}
      />
      <button onClick={selectRandomAncedote}>next anecdote</button>

      {highestRatedAnecdote.votes > 0 && (
        <HighestRatedAnecdote anecdote={highestRatedAnecdote} />
      )}
    </div>
  );
};

const Anecdote = ({ anecdote, onVote }) => {
  const { text, votes } = anecdote;
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
      {onVote && <button onClick={onVote}>Vote</button>}
    </>
  );
};

const HighestRatedAnecdote = ({ anecdote }) => (
  <>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={anecdote} />
  </>
);

export default App;
