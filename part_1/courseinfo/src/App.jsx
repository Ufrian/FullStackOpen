const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course}/>
      <Content part={[part1.name, part2.name, part3.name]} exercise={[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
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