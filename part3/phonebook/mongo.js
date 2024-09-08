const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `${password}`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
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