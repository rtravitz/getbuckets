import React, { useState } from 'react'
import axios from 'axios'

import { SHOW } from '../../controlModes'
import LockedToggle from '../../LockedToggle'

const RATING = 'RATING'
const SENDING = 'SENDING'
const SUCCESS = 'SUCCESS'

const LOCKED = 'LOCKED'
const OPEN = 'OPEN'

function RateLockView({ setControlMode, bucketID }) {
  const [selectedOption, setSelectedOption] = useState(LOCKED)
  const [status, setStatus] = useState(RATING)

  const submitRating = async () => {
    try {
      setStatus(SENDING)
      const locked = selectedOption === LOCKED
      const res = await axios.post(`http://localhost:5000/api/v0/buckets/${bucketID}/ratings`, { locked, })
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
      <LockedToggle />
      {
        status === RATING &&
        <form onSubmit={submitRating}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={LOCKED}
                onChange={() => setSelectedOption(LOCKED)}
                checked={selectedOption === LOCKED} />
            Locked
          </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={OPEN}
                onChange={() => setSelectedOption(OPEN)}
                checked={selectedOption === OPEN} />
            Open
          </label>
          </div>
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

export default RateLockView
