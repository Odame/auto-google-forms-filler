import { Button, Checkbox, Form, InputNumber } from 'antd';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import {
  defaultControlPanelData,
  forgetOptions,
  rememberOptions,
  setOptions,
} from './controlPanelSlice';
import routes from '../../constants/routes.json';
import styles from './ControlPanel.css';

type Props = {
  className?: string | undefined;
};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function ControlPanel({ className }: Props) {
  const initialFormData = useTypedSelector((state) => {
    if (state.controlPanel.rememberOptions === true) return state.controlPanel;
    return defaultControlPanelData;
  });

  const dispatch = useDispatch();
  /** Called with validated data from the form, after form submission */
  const onFinish = (values: typeof initialFormData) => {
    dispatch(setOptions(values));
    if (values.rememberOptions) {
      dispatch(rememberOptions());
    } else {
      dispatch(forgetOptions());
    }
    // go to the data generation page
    dispatch(push(routes.GENERATE_DATA));
  };

  return (
    <Form
      className={`${className} ${styles.controlPanel}`}
      name="controlPanel"
      initialValues={initialFormData}
      onFinish={onFinish}
      layout="vertical"
      {...layout}
    >
      <Form.Item
        name="numSamples"
        label="How many data samples?"
        rules={[{ required: true, message: 'Number of Samples is required!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="headless" valuePropName="checked">
        <Checkbox>Run in headless mode.</Checkbox>
      </Form.Item>

      <Form.Item name="preEdit" valuePropName="checked">
        <Checkbox>Show preview to allow pre-editing before submit</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Generate Data
        </Button>

        <Form.Item name="rememberOptions" valuePropName="checked" noStyle>
          <Checkbox>Remember my options</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

ControlPanel.defaultProps = {
  className: '',
};

export default ControlPanel;
