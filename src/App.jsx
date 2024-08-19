import { useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import { Persons } from "./components/Persons"
import { PersonForm } from "./components/PersonForm"
import { ALL_PERSONS } from "./queries"
import { Notify } from "./components/Notify"
import { PhoneForm } from "./components/PhoneForm"
import { LoginForm } from "./components/LoginForm"
import { useEffect } from "react"

function App() {
  const result = useQuery(ALL_PERSONS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('phonebook-user-token'))
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('phonebook-user-token')
    client.resetStore()
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
