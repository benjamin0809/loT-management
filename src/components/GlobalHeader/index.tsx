import React, { useState } from 'react'
import config from '@/utils/config'
import styles from './style.less'
import { HeaderProps, Link } from '@/interfaces/Common'
 

const GlobalHeader: React.FC<HeaderProps> = ({ links }) => {
  return (
    <header className={styles.main}>
      <img className={styles.logo} src={config.logoPath} />
      <div className={styles.languages}>
        {links && (
          <div className={styles.links}>
            {links.map((link: Link) => (
              <a
                key={link.key}
                title={link.key}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
export default GlobalHeader
