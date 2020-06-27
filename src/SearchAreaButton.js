import React from 'react'

import Loader from './Loader'
import styles from './SearchAreaButton.module.css'

function SearchAreaButton({ onClick, loading }) {
  const txt = loading ? <Loader /> : 'Search Area'
  return (
    <button onClick={onClick} className={styles.btn}>{txt}</button>
  )
}

export default SearchAreaButton
