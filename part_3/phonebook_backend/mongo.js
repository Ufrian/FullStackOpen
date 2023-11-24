/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length > 3 && process.argv.length < 5) {
  mongoose.connection.close()
  console.log('Wrong Input! Try to use "\node mongo.js password name number"')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Ufrian:${password}@person.i2t6cz8.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(data => {
      console.log(data)

    })
    mongoose.connection.close()
  })
  return
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(result => {
  console.log(`Added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})