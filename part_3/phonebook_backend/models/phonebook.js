const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

// if (process.argv.length === 3) {
    // Person.find({}).then(result => {
        // console.log("phonebook: ")
        // result.forEach(data => {
        //   console.log(data)
        // })
    // mongoose.connection.close()
    // })
    // process.exit(0)
// }   
// 
// const person = new Person({
    // name: process.argv[3],
    // number: process.argv[4]
// })
// 
// person.save().then(result => {
    // console.log(`Added ${person.name} number ${person.number} to phonebook`)
    // mongoose.connection.close()
// })