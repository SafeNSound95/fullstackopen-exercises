require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))

app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (request, response,next) => {
  Person.countDocuments()
    .then((peopleCount) => {
      const info = `
                <div>
                Phonebook has info for ${peopleCount} people
                </div>
                <p> 
                ${new Date().toString()}
                </p>
    `

      response.send(info)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (!person) return response.status(404).end()
      response.json(person)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!name || !number) {
    return response
      .status(400)
      .json({ error: 'either the name or number is missing' })
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person
        .save()
        .then((updatedPerson) => response.json(updatedPerson))
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
