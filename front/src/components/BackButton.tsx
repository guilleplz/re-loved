import React from 'react'
import DownArrow from '../../public/icons/DownArrow'
import styles from "./backbutton.module.css"

interface props {
  href: string
}

const BackButton = ({href} : props) => {
  return (
    <a className={styles.button} href={href}>
      <DownArrow width={20} heigth={20}/>
    </a>
  )
}

export default BackButton
