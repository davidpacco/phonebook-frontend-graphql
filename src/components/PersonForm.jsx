import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_PERSONS, CREATE_PERSON } from "../queries"


export function PersonForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const handleSubmit = e => {
    e.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Phone
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Street
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}
