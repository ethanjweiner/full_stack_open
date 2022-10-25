import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };
  const feedbackGiven = Object.values(feedback).find((num) => num > 0);

  const feedbackSetter = {
    good: () => setGood(good + 1),
    neutral: () => setNeutral(neutral + 1),
    bad: () => setBad(bad + 1),
  };

  const noFeedback = <p>No feedback given</p>;

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackControl onFeedback={(feedback) => feedbackSetter[feedback]} />
      <h1>statistics</h1>
      {feedbackGiven ? <Statistics feedback={feedback} /> : noFeedback}
    </div>
  );
};

const FeedbackControl = ({ onFeedback }) => {
  return (
    <>
      <Button onClick={onFeedback('good')} text="good"></Button>
      <Button onClick={onFeedback('neutral')} text="neutral"></Button>
      <Button onClick={onFeedback('bad')} text="bad"></Button>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ feedback }) => {
  let { good, neutral, bad } = feedback;
  let all = good + neutral + bad;
  let average = Math.round(((good - bad) / all) * 10) / 10;
  let positivePercent = Math.round((good / all) * 100 * 10) / 10;

  return (
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positivePercent + '%'} />
    </table>
  );
};

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App;
