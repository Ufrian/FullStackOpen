import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({value}) => {
  const sumOfScores = value.good + value.neutral + value.bad
  const avg = ( value.good - value.bad ) / sumOfScores
  const positive = ( value.good / sumOfScores ) * 100

  if (sumOfScores === 0) return (<div>No feedback given</div>)

  return (
    <table>
      <tbody>
      <StatisticsLine value={value.good} text="good" />
      <StatisticsLine value={value.neutral} text="neutral" />
      <StatisticsLine value={value.bad} text="bad" />
      <StatisticsLine value={sumOfScores} text="all" />
      <StatisticsLine value={avg} text="average" />
      <StatisticsLine value={`${positive} %`} text="positive"/> 
      </tbody>
    </table>
  )
}   

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Header text="statistics"/>
      <Statistics value={{good, neutral, bad}}/>
    </div>
  )
}

export default App