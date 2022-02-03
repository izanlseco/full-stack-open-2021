import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}

const Statistics = ({good, neutral, bad, total, average}) => {
  if (total !== 0) {
    return (
      <table>
        <tbody>
          <Statistic text='Good: ' feedback={good} />
          <Statistic text='Neutral: ' feedback={neutral} />
          <Statistic text='Bad: ' feedback={bad} />
          <Statistic text='Total: ' feedback={total} />
          <Statistic text='Average: ' feedback={average} />
          <Statistic text='Positive: ' feedback={good - bad} label={`${good - bad}%`} />
        </tbody>
      </table>
    )
  }

  return (
    <p>No feedback has been given yet.</p>
  )
}

const Statistic = ({ text, feedback, label }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{feedback}{label}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = good - bad / total

  return (
    <div>
      <h2>Give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text='Good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='Bad' />
      <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);