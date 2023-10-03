import { useState } from 'react'

const Person = ({person}) => 
    <div>
      {person.name} {person.number}
    </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    if (event.target.value) setShowAll(false)
    else setShowAll(true)

    setNewFilter(event.target.value)
  }

  const personsToDisplay = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

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
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
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
        {personsToDisplay.map((person) => 
          <Person key={person.name} person={person} />)}
      </div>
    </div>
  )
}

export default App