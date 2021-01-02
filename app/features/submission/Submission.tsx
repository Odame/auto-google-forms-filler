import { Button, Progress, Result, Typography } from 'antd';
import { replace, goBack } from 'connected-react-router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined, LeftOutlined } from '@ant-design/icons';

import routes from '../../constants/routes.json';
import styles from './Submission.css';
import { useTypedSelector } from '../../store';

const { Text } = Typography;

function Submission() {
  const numSamples = useTypedSelector((state) => state.controlPanel.numSamples);
  const wasPreviewPageShown = useTypedSelector(
    (state) => state.controlPanel.preEdit
  );
  const [error, setHasError] = useState(false);

  const [numSubmitted, setNumSubmitted] = useState(0);

  const dispatch = useDispatch();
  const goBackToPrevPage = () => {
    if (wasPreviewPageShown) dispatch(goBack());
    else dispatch(replace(routes.HOME));
  };

  const onBackButtonClicked = () => {
    goBackToPrevPage();
  };

  const onCancelButtonClicked = () => {
    goBackToPrevPage();
  };

  return (
    <div className={styles.submission}>
      {error ? (
        <Result
          status="warning"
          title="There were some problems with submitting data."
          extra={
            <Button
              type="primary"
              icon={<LeftOutlined />}
              onClick={onBackButtonClicked}
            >
              Back
            </Button>
          }
        />
      ) : (
        <>
          <Progress
            type="circle"
            percent={Math.floor((numSubmitted / numSamples) * 100)}
          />
          <Text className={styles.progressText}>
            {numSubmitted === numSamples
              ? 'Completed'
              : 'Submitting generated data ...'}
          </Text>
          {numSubmitted !== numSamples ? (
            <Button
              type="default"
              danger
              icon={<CloseCircleOutlined />}
              onClick={onCancelButtonClicked}
            >
              Cancel
            </Button>
          ) : (
            <Link to={routes.HOME}>
              <Button type="primary">Okay</Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default Submission;
