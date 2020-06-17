import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Map from './Map'
import Controls from './Controls'
import { DEFAULT } from './controlModes'

import './App.css'

function App() {
  const [buckets, setBuckets] = useState([])
  const [newBucket, setNewBucket] = useState(null)
  const [controlMode, setControlMode] = useState(DEFAULT)
  const [currentBucket, setCurrentBucket] = useState(null)
  const refMarker = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/v0/buckets')
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
        setCurrentBucket={setCurrentBucket}
        buckets={buckets} />
      <Controls
        newBucket={newBucket}
        setNewBucket={setNewBucket}
        setBuckets={setBuckets}
        currentBucket={currentBucket}
        controlMode={controlMode}
        setControlMode={setControlMode} />
    </>
  )
}

export default App
