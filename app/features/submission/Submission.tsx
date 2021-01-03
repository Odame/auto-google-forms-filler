import { Button, Progress, Result, Typography } from 'antd';
import { replace, goBack } from 'connected-react-router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined, LeftOutlined } from '@ant-design/icons';

import { emit } from 'eiphop';
import routes from '../../constants/routes.json';
import styles from './Submission.css';
import { useTypedSelector } from '../../store';
import IGeneratedData from '../generateData/types';

const { Text } = Typography;

function Submission() {
  const data = useTypedSelector((state) => state.generatedData);
  const wasPreviewPageShown = useTypedSelector(
    (state) => state.controlPanel.preEdit
  );

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

  const [numSubmitted, setNumSubmitted] = useState(0);
  const [error, setHasError] = useState(false);
  useEffect(() => {
    let isComponentMounted = true;
    (async () => {
      for (let i = 0; isComponentMounted && i < data.length; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await emit<void>('submitGoogleForm', data[i]);
          if (isComponentMounted) setNumSubmitted((c) => c + 1);
        } catch (err) {
          setHasError(true);
          // eslint-disable-next-line no-console
          console.error(`An error occurred while submitting data: ${i}`);
          // eslint-disable-next-line no-console
          console.error(err);
          break;
        }
      }
    })();

    return () => {
      isComponentMounted = false; // when the component is un-mounting
    };
  }, [data, data.length]);

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
            percent={Math.floor((numSubmitted / data.length) * 100)}
          />
          <Text className={styles.progressText}>
            {numSubmitted === data.length
              ? 'Completed'
              : 'Submitting generated data ...'}
          </Text>
          {numSubmitted !== data.length ? (
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
