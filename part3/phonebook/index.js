const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors');
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    const dateNow = new Date();
    res.send(`<p>Phonebook has info ${persons.length} people</p>
        <p>${dateNow}</p>`)
})
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    return String(Math.floor(Math.random() * 1000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number missing' })
    }
    const existingPerson = persons.find(p => p.name === body.name)
    if (existingPerson) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end();
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})