import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_NUMBER } from "../queries"
import { useEffect } from "react"

export function PhoneForm({ setError }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [editNumber, result] = useMutation(EDIT_NUMBER)

  const handleSubmit = (e) => {
    e.preventDefault()

    editNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) setError('Person not found')
  }, [result.data])

  return (
    <div>
      <h2>Edit phone</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            New phone
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        <button>Edit</button>
      </form>
    </div>
  )
}
