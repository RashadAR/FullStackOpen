const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })
    .catch((error) => console.log('Error connecting to mongo', error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!
             Use xx-xxxx or xxx-xxxx format`
        }
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Ada Lovelace',
//     number: '040-1231236'
// })

// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(`${person.name} ${person.number}`)
//     })
//     mongoose.connection.close()
// })

// person.save().then(result => {
//     console.log('phonebook:');
//     console.log(`${result.name} ${result.number}`);
//     mongoose.connection.close()
// })