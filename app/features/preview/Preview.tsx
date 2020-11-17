import { Pagination, message, Button, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useTypedSelector } from '../../store';
import { editData } from '../generateData/generatedDataSlice';
import IGeneratedData from '../generateData/types';
import styles from './Preview.css';
import PreviewDataForm from './PreviewDataForm';
import routes from '../../constants/routes.json';

const { Text } = Typography;

const Preview = () => {
  const generatedDataArray = useTypedSelector((state) => state.generatedData);
  const [form] = useForm();

  const dispatch = useDispatch();

  const [currPage, setCurrPage] = useState(1);
  const dataKeys = useRef(
    generatedDataArray.length ? Object.keys(generatedDataArray[0]) : []
  );
  const onPageChange = useCallback(
    (newPage: number) => {
      const fieldsToValidate = dataKeys.current.map((key) => [
        'data',
        currPage - 1,
        key,
      ]);
      console.log(fieldsToValidate);
      // user is allowed to transition to another page, only if the current page's form's data is valid
      form
        .validateFields(fieldsToValidate)
        .then((values) => {
          dispatch(
            editData({ data: values as IGeneratedData, index: currPage - 1 })
          );
          form.setFields([{ name: ['index'], value: newPage - 1 }]);
          setCurrPage(newPage);
          return values;
        })
        .catch((errors) => {
          message.error('Data on the current page is invalid!');
          console.error(errors);
        });
    },
    [currPage, dispatch, form]
  );

  return (
    <div className={styles.preview}>
      <div className={styles.dataFormContainer}>
        <PreviewDataForm
          form={form}
          data={generatedDataArray}
          initialIndex={0}
        />
        <Pagination
          className={styles.pagination}
          current={currPage}
          onChange={onPageChange}
          responsive
          total={generatedDataArray.length}
          pageSize={1}
        />
      </div>

      <div className={styles.rightPane} style={{ padding: '18px' }}>
        <Text className={styles.infoTextHeading}>
          {generatedDataArray.length} data samples generated
        </Text>
        <Text className={styles.infoTextDescription}>
          You can go over the data and edit where necessary before submission
        </Text>
        <div>
          <Link to={routes.HOME}>
            <Button
              className={styles.button}
              type="default"
              icon={<CloseOutlined />}
              danger
            >
              Cancel
            </Button>
          </Link>
          <Link to={routes.SUBMISSION}>
            <Button
              className={styles.button}
              type="primary"
              icon={<UploadOutlined />}
            >
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
