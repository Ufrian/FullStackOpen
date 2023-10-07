import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({persons}) => 
    <div>
      {persons.map((person) => 
        <PersonDisplay key={person.name} person={person} />)}
    </div>

const PersonDisplay = ({person}) => <div>{person.name} {person.number}</div>

const PersonForm = ({person, handleChange, addPerson}) => {
  return (
    <form>
        <div>
          name: <input value={person.name}
          onChange={handleChange.nameChange}
          />
        </div>
        <div>number: <input value={person.number} 
        onChange={handleChange.numberChange}
        />
        </div>
        <div><button type="submit" onClick={addPerson} >add</button></div>
      </form>
  )
}

const Filter = ({filter, handleFilter}) => 
    <div>
        filter shown with: <input value={filter} onChange={handleFilter} />
    </div>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect( () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => setPersons(response.data))
  }, [])


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
    
    axios
      .post("http://localhost:3001/persons", newPersonObj)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')        
        setNewNumber('')      
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={newFilter} handleFilter={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm person={{name: newName, number: newNumber}} 
      handleChange={{nameChange: handleNameChange, numberChange: handleNumberChange}} addPerson={addNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  )
}

export default App