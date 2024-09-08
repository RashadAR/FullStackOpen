import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const addName = (e) => {
    e.preventDefault()
    const personExists = persons.find((person) => person.name === newName)

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...personExists, number: newNumber }

        personService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setMessageType('error')
              setMessage(`Information of ${newName} has already been removed from server`)
              setTimeout(() => {
                setMessage(null)
              }, 3000)
              setPersons(persons.filter(p => p.id !== updatedPerson.id))
            }
          })
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessageType('success')
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessageType('error')
        setMessage(error.response.data.error)
      })
  }

  const deletePersons = (id) => {
    const personToDelete = persons.find((person) => {
      return person.id === id
    });
    console.log(`Attempting to delete person with ID: ${id}`);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setMessageType('error')
            setMessage(`Information of ${personToDelete.name} has already been removed from server`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== id))
          }
        })
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <PersonForm
        nameValue={newName}
        numValue={newNumber}
        onSubmit={addName}
        onNameChange={handleNameChange}
        onNumChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>{personsToShow.map((p) =>
        <Persons key={p.id} person={p} handleDelete={() => deletePersons(p.id)} />)
      }</div>
    </div>
  )
}

export default App