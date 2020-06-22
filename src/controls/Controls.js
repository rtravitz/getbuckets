import React from 'react'
import CreatingView from './views/CreatingView'
import ShowBucketView from './views/ShowBucketView'
import RateCleanView from './views/RateCleanView'
import RateLockView from './views/RateLockView'
import InfoView from './views/InfoView'
import { CREATE, DEFAULT, SHOW, RATE_CLEAN, RATE_LOCK, INFO } from '../controlModes'
import { InfoIcon, CirclePlusIcon } from '../Icons'
import styles from './Controls.module.css'

function Controls(props) {
  let showFullControls
  
  if (props.controlMode === DEFAULT) {
    showFullControls = styles.sectionToplineSize
    
  } else if (props.controlMode === INFO) {
    showFullControls = styles.sectionExtraFullsize
  } 
  else {
    showFullControls = styles.sectionFullsize
  }

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
      const currentBucket = props.buckets.find(b => b.id === props.currentBucketID)
      if (currentBucket) {
        controlView = (
          <ShowBucketView
            bucket={currentBucket}
            setControlMode={props.setControlMode} />
        )
      }
      break
    case RATE_CLEAN:
      controlView = (
        <RateCleanView
          bucketID={props.currentBucketID}
          updateBucket={props.updateBucket}
          setControlMode={props.setControlMode} />
      )
      break
    case RATE_LOCK:
      controlView = (
        <RateLockView
          bucketID={props.currentBucketID}
          updateBucket={props.updateBucket}
          setControlMode={props.setControlMode} />
      )
      break
    case INFO:
      controlView = <InfoView setControlMode={props.setControlMode} />
      break
    default:
      controlView = null
  }

  return (
    <section className={`${styles.section} ${showFullControls}`}>
      <div className={styles.topline}>
        <InfoIcon
          size="30"
          className={styles.icons} 
          onClick={() => { props.setControlMode(INFO) }} />
        <h1 className={styles.header}>GetBuckets</h1>
        <CirclePlusIcon
          size="30"
          className={styles.icons}
          onClick={() => { props.setControlMode(CREATE) }} />
      </div>
      {controlView}
    </section>
  )
}

export default Controls