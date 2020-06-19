import React from 'react'
import { RATE_CLEAN, RATE_LOCK } from '../../controlModes'

function ShowBucketView({ bucket, setControlMode }) {
  const createdStr = new Date(bucket.created_at).toLocaleDateString()

  let cleanRating
  const numCleanRatings = bucket.average_rating.clean_ratings
  if ( numCleanRatings > 0) {
    cleanRating = <p>{bucket.average_rating.cleanliness} <span>based on {numCleanRatings} ratings</span></p>
  } else {
    cleanRating = <p>No ratings yet</p>
  }

  let lockedPercent
  const numLockRatings = bucket.average_rating.lock_ratings
  if ( numLockRatings > 0) {
    lockedPercent = <p>{bucket.average_rating.locked_percent}% <span>of the time based on {numLockRatings} ratings</span></p>
  } else {
    lockedPercent = <p>No ratings yet</p>
  }

  return (
    <div>
      <p>Added on {createdStr}</p>
      <div>
        <p>Cleanliness</p>
        {cleanRating}
        <button onClick={() => { setControlMode(RATE_CLEAN) }}>Rate Cleanliness</button>
      </div>
      <div>
        <p>Locked</p>
        {lockedPercent}
        <button onClick={() => { setControlMode(RATE_LOCK) }}>Rate Locked</button>
      </div>
    </div>
  )
}

export default ShowBucketView
