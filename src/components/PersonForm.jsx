import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!) {
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city
    ) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`

export function PersonForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON)

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
