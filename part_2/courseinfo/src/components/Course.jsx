const Header = ({ course }) => <h2>{course}</h2>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    
  return (
      <b>
        Number of exercises {total}
      </b>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
    
const Course = ({course}) => 
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  
export default Course