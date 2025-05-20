import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const resetMessage = () => {
    setTimeout(() => setMessage(null), 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const queriedPerson = persons.find((person) => person.name === newName);

    if (queriedPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { name: newName, number: newNumber };

        personsService
          .update(updatedPerson, queriedPerson.id)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === queriedPerson.id ? returnedPerson : p
              )
            );

            setMessage(`Updated ${newName}`);
            resetMessage();
            setNotificationClass("success");
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from the server`
            );
            resetMessage();
            setNotificationClass("error");
            setPersons(persons.filter((p) => p.id !== queriedPerson.id));
          });
      } else return;
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Created ${newName}`);
        resetMessage();
        setNotificationClass("success");
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage(`Deleted ${person.name}`);
          resetMessage();
          setNotificationClass("success");
        })
        .catch((error) => {
          setMessage(
            `Information of ${person.name} has already been removed from the server`
          );
          resetMessage();
          setNotificationClass("error");
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const personsToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  if (!personsToShow) return;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={notificationClass} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
