const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors');
const Person = require('./models/person');
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'));

app.use(express.json());

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})
app.get('/info', (req, res) => {
    const dateNow = new Date();
    Person.count().then(count => {
        res.send(`<p>Phonebook has info ${count} people</p>
            <p>${dateNow}</p>`)
    })

})
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        "name": name,
        "number": number
    })
    person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end()
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;

    Person.findByIdAndUpdate(req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})