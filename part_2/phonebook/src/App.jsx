import { useState, useEffect } from 'react'
import phoneService from '../services/phonebook'

const Notification = (props) => {
  const show = props.status ? 'success' : 'error'

  if (props.message === null) return

  return (
    <div className={show} >{props.message}</div>
  )
}

const Persons = ({ persons, delPerson }) =>
  <div>
    {persons.map((person) =>
      <PersonDisplay key={person.name} person={person} delPerson={delPerson} />)}
  </div>

const PersonDisplay = ({ person, delPerson }) => {
  return (
    <div>
    {person.name} {person.number}
    <button onClick={() => delPerson(person.name, person.id)}>delete</button>
  </div>
  )}

const PersonForm = ({ person, handleChange, addPerson }) => {
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

const Filter = ({ filter, handleFilter }) =>
  <div>
    filter shown with: <input value={filter} onChange={handleFilter} />
  </div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

    const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) || false

    if (personToUpdate) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        handleMessage(`${newName} Number Changed`, true)
        updatePerson({...personToUpdate, number: newNumber})
        return
      }
      else return
    }

    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    phoneService
      .create(newPersonObj)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        handleMessage(`${newName} Added`, true)
      })
      .catch(error => {
        handleMessage(error.response.data.error, false)
      })
  }

  const updatePerson = (changedPerson) => {
    phoneService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        if (returnedPerson) {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        }
        else {
          setPersons(persons.filter(person => person.id !== changedPerson.id))
          handleMessage(`Information of ${changedPerson.name} has already been removed from server`, false)
        }
      })
      .catch(error => handleMessage(error.response.data.error, false))
  }

  const handleMessage = (msg, sts) => {
    setStatus(sts)
    setNotificationMessage(msg)
    setTimeout( () => setNotificationMessage(null), 7000)
  }

  const delPerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .delRequest(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => alert(`${name} was already deleted`))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} status={status} /> 
      <Filter filter={newFilter} handleFilter={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm person={{ name: newName, number: newNumber }}
        handleChange={{ nameChange: handleNameChange, numberChange: handleNumberChange }} 
        addPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} delPerson={delPerson} />
    </div>
  )
}

export default App