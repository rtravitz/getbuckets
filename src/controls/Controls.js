import React from 'react'
import CreatingView from './views/CreatingView'
import ShowBucketView from './views/ShowBucketView'
import RateCleanView from './views/RateCleanView'
import RateLockView from './views/RateLockView'
import { CREATE, DEFAULT, SHOW, RATE_CLEAN, RATE_LOCK } from '../controlModes'
import { InfoIcon, CirclePlusIcon } from '../Icons'
import styles from './Controls.module.css'

function Controls(props) {
  const showFullControls = props.controlMode === DEFAULT ? '' : styles.sectionFullsize

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
    <section className={`${styles.section} ${showFullControls}`}>
      <div className={styles.topline}>
        <InfoIcon
          size="30"
          className={styles.icons} />
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