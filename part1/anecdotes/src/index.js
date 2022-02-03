import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ selected }) => <p>{selected}</p>

const App = () => {

  const [allVotes, setVote] = useState([0, 0, 0, 0, 0, 0])
  const [mostVoted, setMostVoted] = useState(0)
  const [selected, setSelected] = useState(0)
  const [actualIndex, setIndex] = useState(0)
  

  const copy = [...allVotes]

  const handleNextClick = () => {
    let index = Math.floor(Math.random() * 6)
    setIndex(index)
    setSelected(anecdotes[index])
  }

  const handleVote = () => {
    copy[actualIndex] += 1
    setVote(copy)
    setMostVoted(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display selected={selected !== 0 ? selected : anecdotes[1]} />
      <Display selected={allVotes[actualIndex]} />
      <Button handleClick={() => handleVote()} text='Vote' />
      <Button handleClick={() => handleNextClick()} text='Next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Display selected={selected !== 0 ? anecdotes[mostVoted] : anecdotes[1]} />
      <Display selected={allVotes[mostVoted]} />
    </div>
  )
}

Math.floor(Math.random() * 5); 

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);
