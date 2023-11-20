require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
      const date = new Date().toString()
      const html = `
      <div>
          <p>Phonebook has info for ${count} people </p>
          <p>${date}</p>
      </div>
      `
      response.send(html)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
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
  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
