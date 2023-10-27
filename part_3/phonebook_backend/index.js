const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date().toString() 
    const html = `
    <div>
        <p>Phonebook has info for ${persons.length} people </p>
        <p>${date}</p>
    </div>
    `
    response.send(html)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) response.json(person)
    else response.status(404).end()
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * Date.now() % 10000) 
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) return response.status(400).json({error: "name/number missing"})

  const isAdded = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())

  if (isAdded) return response.status(400).json({ error: 'name must be unique' })

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})
  

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
