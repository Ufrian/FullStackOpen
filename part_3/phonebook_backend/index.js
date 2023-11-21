require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
})

app.get('/info', (request, response, next) => {
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
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) response.json(person)
      else response.send(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    const err = new Error('Failed to add! Missing name/number fields')
    err.name = "MissingField"
    next(err)
    return 
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({error: 'malformatted id'})
  }

  if (error.name === "MissingField") {
    return response.status(400).json({error: "name/number missing"})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
