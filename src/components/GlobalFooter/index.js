import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright, slogon }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}> 
      {copyright && <div className={styles.copyright}>{copyright}</div>}
      {slogon && <div className={styles.copyright}>{slogon}</div>}
    </footer>
  );
};

export default GlobalFooter;
