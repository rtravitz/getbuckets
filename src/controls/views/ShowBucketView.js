import React from 'react'
import { RATE_CLEAN, RATE_LOCK } from '../../controlModes'
import LockBlock from '../LockBlock'
import CleanBlock from '../CleanBlock'
import styles from './ShowBucketView.module.css'

function ShowBucketView({ bucket, setControlMode }) {
  return (
    <div>
      <div className={styles.topline}>
        <p>Tap the scores to add your rating.</p>
      </div>
      <div className={styles.blockRow}>
        <CleanBlock 
          onClick={() => { setControlMode(RATE_CLEAN) }} 
          numRatings={bucket.average_rating.clean_ratings}
          rating={bucket.average_rating.cleanliness} />
        <LockBlock
          onClick={() => { setControlMode(RATE_LOCK) }}
          numRatings={bucket.average_rating.lock_ratings}
          rating={bucket.average_rating.locked_percent} />
      </div>
    </div>
  )
}

export default ShowBucketView
