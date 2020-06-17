import React, { useState } from 'react'
import axios from 'axios'

import { SHOW } from './controlModes'

const RATING = 'RATING'
const SENDING = 'SENDING'
const SUCCESS = 'SUCCESS'

function RateCleanView({ bucketID, setControlMode }) {
  const [rating, setRating] = useState("3")
  const [status, setStatus] = useState(RATING)
  const submitRating = async () => {
    try {
      setStatus(SENDING)
      const numRating = parseInt(rating)
      const res = await axios.post(`http://localhost:5000/api/v0/buckets/${bucketID}/ratings`, {
        cleanliness: numRating,
      })
      if (res.status === 201) {
        setStatus(SUCCESS)
        setTimeout(() => { setControlMode(SHOW) }, 1500)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {
        status === RATING &&
        <form onSubmit={submitRating}>
          <select value={rating} onChange={(e) => { setRating(e.target.value) }}>
            <option value="1">Terrible</option>
            <option value="2">Bad</option>
            <option value="3">Meh</option>
            <option value="4">Clean</option>
            <option value="5">Pristine</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
      }
      {
        status !== RATING &&
        <h3>{status}</h3>
      }
      <button onClick={() => setControlMode(SHOW)}>Back</button>
    </div>
  )
}

export default RateCleanView