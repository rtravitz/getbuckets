import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Map from './map/Map'
import Controls from './controls/Controls'
import { DEFAULT } from './controlModes'

import './App.css'

function App() {
  const [buckets, setBuckets] = useState([])
  const [newBucket, setNewBucket] = useState(null)
  const [controlMode, setControlMode] = useState(DEFAULT)
  const [currentBucketID, setCurrentBucketID] = useState(null)
  const refMarker = useRef(null)

  const updateBucket = (fresh) => {
    const existing = [...buckets]
    const idx = existing.findIndex(b => b.id === fresh.id)
    existing[idx] = fresh
    setBuckets(existing)
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/buckets`)
      .then((res) => { setBuckets(res.data) })
  }, [])

  return (
    <>
      <Map
        refMarker={refMarker}
        controlMode={controlMode}
        center={[47.617396, -122.310563]}
        setNewBucket={setNewBucket}
        setControlMode={setControlMode}
        setCurrentBucketID={setCurrentBucketID}
        buckets={buckets} />
      <Controls
        newBucket={newBucket}
        setNewBucket={setNewBucket}
        buckets={buckets}
        setBuckets={setBuckets}
        updateBucket={updateBucket}
        currentBucketID={currentBucketID}
        controlMode={controlMode}
        setControlMode={setControlMode} />
    </>
  )
}

export default App
