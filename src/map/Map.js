import React, { useState, useRef } from 'react'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import axios from 'axios'

import SearchAreaButton from './SearchAreaButton'
import { redBucketMarker, blueBucketMarker } from './Marker'
import { CREATE, SHOW } from '../controlModes'

function Map({ 
  buckets, 
  startingCenter,
  controlMode, 
  refMarker, 
  setNewBucket, 
  setBuckets,
  setCurrentBucketID, 
  setControlMode 
}) {
  const [markerCenter, setMarkerCenter] = useState(startingCenter)
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false)
  const [searchAreaLoading, setSearchAreaLoading] = useState(false)
  const refMap = useRef(null)

  const updatePosition = () => {
    const marker = refMarker.current
    if (marker !== null) {
      const latLng = marker.leafletElement.getLatLng()
      setNewBucket(latLng)
      setMarkerCenter(latLng)
    }
  }

  const markerClick = (bucketID) => {
    return () => {
      setCurrentBucketID(bucketID)
      setControlMode(SHOW)
    }
  }

  const updateCreateMarker = (e) => {
    setShowSearchAreaButton(true)

    if (controlMode !== CREATE) {
      setMarkerCenter(e.target.getCenter())
    }
  }

  const checkBounds = (e) => {
    const bounds = e.target.getBounds()
    const query = `bbox=${bounds._southWest.lng},${bounds._southWest.lat},${bounds._northEast.lng},${bounds._northEast.lat}`
    axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/buckets?${query}`)
      .then((res) => { setBuckets(res.data) })
      .catch((err) => { console.log(err) })
  }

  const searchBuckets = () => {
    if (refMap.current) {
      const bounds = refMap.current.leafletElement.getBounds()
      const query = `bbox=${bounds._southWest.lng},${bounds._southWest.lat},${bounds._northEast.lng},${bounds._northEast.lat}`
      setSearchAreaLoading(true)
      axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/buckets?${query}`)
        .then((res) => {
          setBuckets(res.data)
          setShowSearchAreaButton(false)
          setSearchAreaLoading(false)
        })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <section className="map">
      {showSearchAreaButton && <SearchAreaButton loading={searchAreaLoading} onClick={searchBuckets} />}
      <LeafletMap
        ref={refMap}
        center={startingCenter} 
        whenReady={checkBounds}
        onMoveEnd={updateCreateMarker}
        zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          controlMode === CREATE &&
          <Marker
            icon={redBucketMarker}
            position={markerCenter}
            ref={refMarker}
            draggable={true}
            ondragend={updatePosition}
          />
        }
        {
          buckets.map((bucket) => (
            <Marker 
              key={bucket.id} 
              icon={blueBucketMarker}
              position={[bucket.lat, bucket.lng]} 
              onClick={markerClick(bucket.id)} />
          ))
        }
      </LeafletMap>
    </section>
  )
}

export default Map
