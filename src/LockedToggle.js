import React from 'react'

import { LockClosedIcon, LockOpenIcon } from './Icons'
import styles from './LockedToggle.module.css'

function LockedToggle({ onClick }) {
  return (
    <div className={styles.container}>
      <LockClosedIcon size="30px" />
      <label className={styles.switch}>
        <input type="checkbox" />
        <span onClick={onClick}  className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <LockOpenIcon size="30px" />
    </div>
  )
}

export default LockedToggle
