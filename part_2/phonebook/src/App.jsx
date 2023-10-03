import { useState } from 'react'

const Person = ({person}) => 
    <div>
      {person.name} {person.number}
    </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) return alert("Fill out all the fields")

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      setNewName('')
      setNewNumber('')      
      return alert(`${newName} is already added to phonebook`)
    }

    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    
    setPersons(persons.concat(newPersonObj))
    setNewName('')
    setNewNumber('')      
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
        <div>number: <input value={newNumber} 
        onChange={handleNumberChange}
        />
        </div>
        <div><button type="submit" onClick={addNewPerson} >add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => 
          <Person key={person.name} person={person} />)}
      </div>
    </div>
  )
}

export default App