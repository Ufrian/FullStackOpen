const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part={[part1, part2, part3]} exercise={[exercises1, exercises2, exercises3]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Content = ({part, exercise}) => {
  return (
    <div>
      <Part part={part[0]} exercise={part[0]}/>  
      <Part part={part[1]} exercise={exercise[1]}/>  
      <Part part={part[2]} exercise={exercise[2]}/>  
    </div>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.total}</p>
    </>
  ) 
}

const Part = ({part, exercise}) => {
  return (
    <>
      <p>{part} {exercise}</p>        
    </>
  )
}


export default App