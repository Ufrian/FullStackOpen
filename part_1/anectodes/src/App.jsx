import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const DisplayAnecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const max = anecdotes.length
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(max).fill(0))
  
  const genRandomAnecdote = () => {
    const random = Math.floor(Math.random() * max)
    setSelected(random)
  }
  
  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  const getMostVotes = () => {
    const biggest = Math.max(...points)
    const index = points.indexOf(biggest)
    return index
  }

  const mostVotes = getMostVotes()

  return (
    <div>
      <Header text="Anecdote of the day" />
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={genRandomAnecdote} text="next anecdote"/>

      <Header text="Anecdote with most votes" />
      <DisplayAnecdote anecdote={anecdotes[mostVotes]} votes={points[mostVotes]}/>
    </div>
  )
}

export default App