const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

mongoose.set('strictQuery', false)

mongoose.connect(
  `mongodb+srv://safensound95:${password}@cluster0.1uuvriq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  console.log('phonebook:')
  Person.find({}).then((people) => {
    people.forEach((person) => console.log(`${person.name} ${person.number} `))
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log(result)
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )

    mongoose.connection.close()
  })
}
