import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => <div>{text} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      {/* Try later on! refactor and encapsule in a Feedback and a Statistic component */}
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Header text="statistics"/>
      <Statistic value={good} text="good" />
      <Statistic value={neutral} text="neutral" />
      <Statistic value={bad} text="bad" />
      

    </div>
  )
}


export default App