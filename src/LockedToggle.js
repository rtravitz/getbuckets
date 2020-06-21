import React from 'react'
import styles from './LockedToggle.module.css'

function LockedToggle() {
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span>
          <em></em>
          <strong></strong>
        </span>
      </label>
    </div>
  )
}

export default LockedToggle
