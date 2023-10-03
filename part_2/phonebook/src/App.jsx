import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
    {props.person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      setNewName('')      
      return alert(`${newName} is already added to phonebook`)
    }

    const newPersonObj = {
      name: newName
    }

    setPersons(persons.concat(newPersonObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map( (person) => 
          <Person key={person.name} person={person} />)}
      </div>
    </div>
  )
}

export default App