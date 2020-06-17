import React, { useState } from 'react'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import { CREATE, SHOW } from './controlModes'

function Map({ buckets, center, controlMode, refMarker, setNewBucket, setCurrentBucket, setControlMode }) {
  const [markerCenter, setMarkerCenter] = useState(center)

  const updatePosition = () => {
    const marker = refMarker.current
    if (marker !== null) {
      const latLng = marker.leafletElement.getLatLng()
      setNewBucket(latLng)
      setMarkerCenter(latLng)
    }
  }

  const markerClick = (bucket) => {
    return () => {
      setCurrentBucket(bucket)
      setControlMode(SHOW)
    }
  }

  return (
    <section className="map">
      <LeafletMap center={center} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          controlMode === CREATE &&
          <Marker
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
              position={[bucket.lat, bucket.lng]} 
              onClick={markerClick(bucket)} />
          ))
        }
      </LeafletMap>
    </section>
  )
}

export default Map