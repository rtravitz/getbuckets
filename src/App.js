import React, { useState, useRef } from 'react'

import Map from './map/Map'
import IntroScreen from './IntroScreen'
import Controls from './controls/Controls'
import { DEFAULT } from './controlModes'

import './App.css'

function App() {
  const [buckets, setBuckets] = useState([])
  const [newBucket, setNewBucket] = useState(null)
  const [controlMode, setControlMode] = useState(DEFAULT)
  const [currentBucketID, setCurrentBucketID] = useState(null)
  const [startingCenter, setStartingCenter] = useState(null)

  const refMarker = useRef(null)

  const updateBucket = (fresh) => {
    const existing = [...buckets]
    const idx = existing.findIndex(b => b.id === fresh.id)
    existing[idx] = fresh
    setBuckets(existing)
  }

  return (
    <>
      {
        !startingCenter && 
        <IntroScreen setStartingCenter={setStartingCenter} />
      }
      {
        startingCenter && (
          <>
            <Map
              startingCenter={startingCenter}
              refMarker={refMarker}
              controlMode={controlMode}
              setNewBucket={setNewBucket}
              setControlMode={setControlMode}
              setBuckets={setBuckets}
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
    </>
  )
}

export default App
