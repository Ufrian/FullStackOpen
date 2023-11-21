require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

let persons = []

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
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) return response.status(400).json({error: "name/number missing"})

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
