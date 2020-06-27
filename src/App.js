import React, { useState, useRef } from 'react'
import axios from 'axios'
import Map from './map/Map'
import Controls from './controls/Controls'
import { DEFAULT } from './controlModes'

import './App.css'
import SearchAreaButton from './SearchAreaButton'

function App() {
  const [buckets, setBuckets] = useState([])
  const [newBucket, setNewBucket] = useState(null)
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false)
  const [searchAreaLoading, setSearchAreaLoading] = useState(false)
  const [controlMode, setControlMode] = useState(DEFAULT)
  const [currentBucketID, setCurrentBucketID] = useState(null)
  const refMarker = useRef(null)
  const refMap = useRef(null)

  const updateBucket = (fresh) => {
    const existing = [...buckets]
    const idx = existing.findIndex(b => b.id === fresh.id)
    existing[idx] = fresh
    setBuckets(existing)
  }

  const searchBuckets = () => {
    if (refMap.current) {
      const bounds = refMap.current.leafletElement.getBounds()
      const query = `bbox=${bounds._southWest.lng},${bounds._southWest.lat},${bounds._northEast.lng},${bounds._northEast.lat}`
      setSearchAreaLoading(true)
      axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/bucketsbox?${query}`)
        .then((res) => { 
          setBuckets(res.data) 
          setShowSearchAreaButton(false) 
          setSearchAreaLoading(false)
        })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <>
      { showSearchAreaButton && <SearchAreaButton loading={searchAreaLoading} onClick={searchBuckets} /> }
      <Map
        refMap={refMap}
        refMarker={refMarker}
        controlMode={controlMode}
        setNewBucket={setNewBucket}
        setControlMode={setControlMode}
        setBuckets={setBuckets}
        setShowSearchAreaButton={setShowSearchAreaButton}
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
