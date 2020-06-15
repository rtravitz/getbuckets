import React, { useState } from 'react'
import axios from 'axios'
import { DEFAULT } from './controlModes'

function CreatingView({ newBucket, setNewBucket, setControlMode, setBuckets }) {
  const [errMessage, setErrMessage] = useState(null)

  const saveNewBucket = async (newBucket) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v0/buckets', {
        lat: newBucket.lat,
        lng: newBucket.lng,
      })
      setControlMode(DEFAULT)
      setBuckets((prevBuckets) => ([...prevBuckets, res.data]))
      setNewBucket(null)
    } catch (err) {
      setErrMessage('Oh no, we failed to save this location! Please try again later.')
    }
  }

  return (
    <div>
      <p>Drag the pin to the location where you found the bucket!</p>
      {errMessage && <p>{errMessage}</p>}
      <button onClick={() => { saveNewBucket(newBucket) }}>Save</button>
    </div>
  )
}

export default CreatingView