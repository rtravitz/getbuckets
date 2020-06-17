import React from 'react'
import { PlusIcon, InfoIcon } from '@primer/octicons-react'
import CreatingView from './CreatingView'
import ShowBucketView from './ShowBucketView'
import RateCleanView from './RateCleanView'
import RateLockView from './RateLockView'
import { CREATE, DEFAULT, SHOW, RATE_CLEAN, RATE_LOCK } from './controlModes'

function Controls(props) {
  const showFullControls = props.controlMode === DEFAULT ? 'controls-slim' : 'controls-full'
  let controlView
  switch (props.controlMode) {
    case CREATE:
      controlView = (
        <CreatingView
          setControlMode={props.setControlMode}
          setBuckets={props.setBuckets}
          setNewBucket={props.setNewBucket}
          newBucket={props.newBucket} />
      )
      break
    case SHOW:
      controlView = (
        <ShowBucketView 
          bucket={props.currentBucket} 
          setControlMode={props.setControlMode} />
      )
      break
    case RATE_CLEAN:
      controlView = (
        <RateCleanView 
          bucketID={props.currentBucket.id} 
          setControlMode={props.setControlMode} />
      )
      break
    case RATE_LOCK:
      controlView = (
        <RateLockView 
          bucketID={props.currentBucket.id}
          setControlMode={props.setControlMode} />
      )
      break
    default:
      controlView = null
  }

  return (
    <section className={`controls ${showFullControls}`}>
      <h1 className="controls-header">GetBuckets</h1>
      <div className="controls-topline">
        <InfoIcon size={24} />
        <div
          onClick={() => { props.setControlMode(CREATE) }
          }>
          <PlusIcon size={24} />
        </div>
      </div>
      {controlView}
    </section>
  )
}

export default Controls