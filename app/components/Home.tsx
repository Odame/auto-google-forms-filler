import { Typography } from 'antd';
import React from 'react';
import ControlPanel from '../features/controlPanel/ControlPanel';
import styles from './Home.css';
import googleFormIcon from '../images/google-forms-icon.png';

const { Title } = Typography;

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.sider}>
        <Title className={styles.title}>Auto Google Form Filling</Title>
      </div>
      <div className={styles.divider} />
      <div className={styles.controlPanel}>
        <ControlPanel />
      </div>
      <div className={styles.googleFormsIconContainer}>
        <img
          src={googleFormIcon}
          alt="Google Forms Icon"
          className={styles.googleFormIcon}
        />
      </div>
    </div>
  );
}
