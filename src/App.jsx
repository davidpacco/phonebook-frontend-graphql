import { useState } from "react"
import { useQuery } from "@apollo/client"
import { Persons } from "./components/Persons"
import { PersonForm } from "./components/PersonForm"
import { ALL_PERSONS } from "./queries"
import { Notify } from "./components/Notify"
import { PhoneForm } from "./components/PhoneForm"

function App() {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
