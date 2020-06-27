import React, { useState, useEffect } from 'react'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import { CREATE, SHOW } from '../controlModes'
import { redBucketMarker, blueBucketMarker } from './Marker'
import axios from 'axios'

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude]
        resolve(coords)
      })
    } else {
      reject("Geo Location not supported by browser")
    }
  })
}

function Map({ 
  refMap,
  buckets, 
  controlMode, 
  refMarker, 
  setNewBucket, 
  setBuckets,
  setCurrentBucketID, 
  setShowSearchAreaButton,
  setControlMode 
}) {
  const [userCenter, setUserCenter] = useState([47.617396, -122.310563])
  const [markerCenter, setMarkerCenter] = useState(userCenter)

  useEffect(() => {
    getLocation()
      .then((coords) => { setUserCenter(coords) })
      .catch((err) => { console.log(err) })
  }, [])

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
    axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/bucketsbox?${query}`)
      .then((res) => { setBuckets(res.data) })
      .catch((err) => { console.log(err) })
  }

  return (
    <section className="map">
      <LeafletMap
        ref={refMap}
        center={userCenter} 
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
