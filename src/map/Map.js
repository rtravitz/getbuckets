import React, { useState } from 'react'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import { CREATE, SHOW } from '../controlModes'
import { redBucketMarker, blueBucketMarker } from './Marker'

function Map({ buckets, center, controlMode, refMarker, setNewBucket, setCurrentBucketID, setControlMode }) {
  const [markerCenter, setMarkerCenter] = useState(center)

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
    if (controlMode !== CREATE) {
      setMarkerCenter(e.target.getCenter())
    }
  }

  return (
    <section className="map">
      <LeafletMap 
        center={center} 
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
