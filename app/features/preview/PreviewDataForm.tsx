/* eslint-disable react/prop-types */
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { FormInstance } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import moment, { Moment } from 'moment';
import React from 'react';
import IGeneratedData from '../generateData/types';
import { unnamedValidateMessages } from './formMessages';
import styles from './Preview.css';

const layout = {
  // labelCol: { span: 24 },
  wrapperCol: { offset: 1, span: 22 },
};

type Props = {
  initialIndex: number;
  form: FormInstance;
  data: Array<IGeneratedData>;
};
export default function PreviewDataForm({ initialIndex, form, data }: Props) {
  return (
    <Form
      layout="vertical"
      className={styles.dataForm}
      form={form}
      {...layout}
      initialValues={{ data, index: initialIndex }}
      validateMessages={unnamedValidateMessages}
    >
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.index !== currentValues.index
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const index = getFieldValue(['index']) as number;
          return (
            <>
              <Form.Item
                className={styles.dataFormItem}
                label="1. Name of department"
                rules={[{ required: true }]}
                name={['data', index, 'one']}
                wrapperCol={{ ...layout.wrapperCol, span: 12 }}
              >
                <Input placeholder="Your answer" />
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="2. Sex"
                name={['data', index, 'two']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="female">
                    Female
                  </Radio>
                  <Radio className={styles.verticalRadio} value="male">
                    Male
                  </Radio>
                  <Radio
                    className={styles.verticalRadio}
                    value="preferNotToSay"
                  >
                    Prefer not to say
                  </Radio>
                  {/* <Radio className={styles.verticalRadio} value="other">
                    Other
                  </Radio> */}
                </Radio.Group>
              </Form.Item>

              {/* render 'other' field if user chooses other from options above */}
              {/* <Form.Item
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.data[index].two !== currentValues.data[index].two
                }
                labelCol={{ offset: 2, span: 20 }}
                wrapperCol={{ offset: 2, span: 20 }}
              >
                {({ getFieldValue: getFieldValue2 }) => {
                  return getFieldValue2(['data', index, 'two']) === 'other' ? (
                    <Form.Item
                      label="Please specify gender"
                      name={['data', index, 'twoOther']}
                      rules={[{ required: true, type: 'string' }]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ offset: 0, span: 24 }}
                    >
                      <Input placeholder="Your answer" />
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item> */}

              <Form.Item
                className={styles.dataFormItem}
                label="3. Marital status"
                name={['data', index, 'three']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="married">
                    Married
                  </Radio>
                  <Radio className={styles.verticalRadio} value="single">
                    Single
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="4. Age"
                name={['data', index, 'four']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="from18To25">
                    18-25
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from24To35">
                    24-35
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from35To45">
                    35-45
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from45To55">
                    45-55
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from55To60">
                    55-60
                  </Radio>
                  <Radio className={styles.verticalRadio} value="over60">
                    Over 60
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="5. Education Level"
                name={['data', index, 'five']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="certificate">
                    Certificate
                  </Radio>
                  <Radio className={styles.verticalRadio} value="diploma">
                    Diploma
                  </Radio>
                  <Radio
                    className={styles.verticalRadio}
                    value="undergraduateDiploma"
                  >
                    Undergraduate Diploma
                  </Radio>
                  <Radio
                    className={styles.verticalRadio}
                    value="postgraduateDiploma"
                  >
                    Post Graduate Diploma
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="6. Work Experience"
                name={['data', index, 'six']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="from1To5">
                    1-5
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from5To10">
                    5-10
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from10To15">
                    10-15
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from15To20">
                    15-20
                  </Radio>
                  <Radio className={styles.verticalRadio} value="from20To25">
                    20-25
                  </Radio>
                  <Radio className={styles.verticalRadio} value="above26">
                    Above 26
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="7. How many years you have been working with ENI? Please specify "
                rules={[
                  { required: true, type: 'number' },
                  {
                    min: 1,
                    type: 'number',
                    message: 'Enter a number greater than zero',
                  },
                ]}
                name={['data', index, 'seven']}
              >
                <InputNumber placeholder="Your answer" />
              </Form.Item>

              <YesNoFormItem
                name={['data', index, 'eight']}
                label="8. Are you aware of the training and development concept?"
                maybe
              />

              <MultiSelectFormItem
                name={['data', index, 'nine']}
                heading="9. What is your understanding of training and development? "
                itemsLabels={[
                  'Efforts made within the company to improve performance of their employees through educational methods and programs',
                  'Strengthening particular skills of employees to improve their competencies',
                  'Educational activities created to enhance the knowledge and skills of the employee',
                  'Providing information and instructions on how to better perform specific tasks',
                ]}
              />

              <YesNoFormItem
                name={['data', index, 'ten']}
                label="10. Is training and development part of your organization policy?"
              />

              <YesNoFormItem
                name={['data', index, 'eleven']}
                label="11. Does ENI offer training opportunities to its staff?"
              />

              <MultiSelectFormItem
                name={['data', index, 'twelve']}
                heading="12. If your answer in the above is yes, please state the kind of training offered"
                itemsLabels={[
                  'In house training',
                  'Online Classroom',
                  'On-the-job training',
                  'All the above',
                ]}
              />

              <YesNoFormItem
                name={['data', index, 'thirteen']}
                label="13. Does ENI provide room for growth after training their staff? "
              />

              <YesNoFormItem
                name={['data', index, 'fourteen']}
                label="14. Are there promotional opportunities available to employee at ENI after training?"
                maybe
              />

              <ScaleFormItem
                name={['data', index, 'fifteen']}
                label="15. What are the chances of being promoted after training?"
              />

              <MultiSelectFormItem
                name={['data', index, 'sixteen']}
                heading="16. What criteria are used by Management to select employees for training? "
                itemsLabels={[
                  'Potential for advancement',
                  'Employee career development needs',
                  'Workload',
                  'Availability of funds',
                  'Degree to which employee meets the stated criteria of said training',
                  'Employees interest and efforts for self-development',
                  'Extent to which employees’ skill set and performance will be enhanced',
                ]}
              />

              <MultiSelectFormItem
                name={['data', index, 'seventeen']}
                heading="17. What are the criteria used for promotion? "
                itemsLabels={[
                  'Experience in job',
                  'High performance level',
                  'Recommendations',
                  'Skillset matching job requirement',
                  'Personal motivation and willingness',
                  'Role opening within the organization',
                ]}
              />

              <ScaleFormItem
                name={['data', index, 'eighteen']}
                label="18. To what extent do the training and development programs meet individual career development? "
              />

              <MultiSelectFormItem
                name={['data', index, 'nineteen']}
                heading="19. What are the shortfall of the Training programs offered at ENI? "
                itemsLabels={[
                  'Lack of thorough analysis in collection of training needs',
                  'Poor selection of candidates to attend the training',
                  'Lack on innovative training programs',
                  'Lack of long term training programs for staff',
                  'Lack of qualified trainers',
                  'Lack of career development plans for the employees',
                ]}
              />

              <YesNoFormItem
                name={['data', index, 'twenty']}
                label="20. Are trainings aligned with the organizational; objectives in career development programs?"
                maybe
                maybeText="Other"
              />

              <MultiSelectFormItem
                name={['data', index, 'twentyOne']}
                heading="21. How does training and development contribute to the employees’ career? "
                itemsLabels={[
                  'Serves as motivation',
                  'Increases the chances of promotion',
                  'Employee empowerment',
                  'Increase engagement in the workplace',
                ]}
              />

              <ScaleFormItem
                name={['data', index, 'twentyTwo']}
                label="22. What is the cost incurred in the process of implementing the training and development policy? On a scale of very low to very high"
              />

              <YesNoFormItem
                name={['data', index, 'twentyThree']}
                label="23. Are there visible positive outcomes after training's in the employees’ career?"
              />

              <YesNoFormItem
                name={['data', index, 'twentyFour']}
                label="24. Does ENI welcome ideas to improve already existing career training and development programs?"
              />

              <Form.Item
                className={styles.dataFormItem}
                label="25. How regular are these ideas welcomed? "
                name={['data', index, 'twentyFive']}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio className={styles.verticalRadio} value="monthly">
                    Monthly
                  </Radio>
                  <Radio className={styles.verticalRadio} value="quarterly">
                    Quarterly
                  </Radio>
                  <Radio className={styles.verticalRadio} value="yearly">
                    Yearly
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <MultiSelectFormItem
                name={['data', index, 'twentySix']}
                heading="26. Please select the most applicable measures that currently exist to improve career development from the list below. "
                itemsLabels={[
                  'Relevant qualification to job existing',
                  'Placing staff in areas of their specialty',
                  'Development of alternative career development paths',
                  'Improve human resources management and relations',
                  'recognizing self-development, initiatives and matching organizational goals for promotional',
                  'Designing policies to guide management',
                  'Free and fair competition for promotion',
                ]}
              />

              <MultiSelectFormItem
                name={['data', index, 'twentySeven']}
                heading="27. Please select the most applicable measure to be taken to improve individual career development from the list below. "
                itemsLabels={[
                  'Relevant qualification to job existing',
                  'Placing staff in areas of their specialty',
                  'Development of alternative career development paths',
                  'Improve human resources management and relations',
                  'Recognizing self-development, initiatives and matching organizational goals for promotional',
                  'Designing policies to guide management',
                  'Free and fair competition for promotion',
                ]}
              />

              <Form.Item
                className={styles.dataFormItem}
                label="28. Any other comments where necessary"
                rules={[{ required: false }]}
                name={['data', index, 'twentyEight']}
              >
                <Input placeholder="Your answer" />
              </Form.Item>

              <Form.Item
                className={styles.dataFormItem}
                label="Please Indicate the date for the completion of this Survey."
                rules={[{ required: true }]}
                name={['data', index, 'dateOfCompletion']}
              >
                <DateInput />
              </Form.Item>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
}

const ScaleFormItem: React.FC<{
  name: NamePath;
  label: string;
}> = ({ name, label }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: 'Please pick an item from the scale!' },
      ]}
      className={styles.dataFormItem}
    >
      {/* <Text style={{ marginRight: '12px' }}>Very low</Text> */}
      <Radio.Group>
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
        <Radio value={3}>3</Radio>
        <Radio value={4}>4</Radio>
        <Radio value={5}>5</Radio>
      </Radio.Group>
      {/* <Text>Very High</Text> */}
    </Form.Item>
  );
};

const YesNoFormItem: React.FunctionComponent<{
  name: NamePath;
  label: string;
  maybe?: boolean;
  maybeText?: string;
}> = ({ name, label, maybe }) => {
  return (
    <Form.Item
      className={styles.dataFormItem}
      label={label}
      name={name}
      rules={[{ required: true }]}
    >
      <Radio.Group>
        <Radio className={styles.verticalRadio} value="yes">
          Yes
        </Radio>
        <Radio className={styles.verticalRadio} value="no">
          No
        </Radio>
        {maybe ? (
          <Radio className={styles.verticalRadio} value="maybe">
            Maybe
          </Radio>
        ) : null}
      </Radio.Group>
    </Form.Item>
  );
};
YesNoFormItem.defaultProps = { maybe: false, maybeText: 'Maybe' };

const MultiSelectFormItem: React.FunctionComponent<{
  name: NamePath;
  heading: string;
  itemsLabels: string[];
  // eslint-disable-next-line react/prop-types
}> = ({ name, heading, itemsLabels }) => {
  const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return (
    <Form.Item
      label={heading}
      name={name}
      rules={[{ required: true }]}
      className={styles.dataFormItem}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {itemsLabels.map((label, i) => {
        const key = keys[i];
        return (
          <Form.Item
            // noStyle
            key={key}
            className={styles.dataFormItemBlock}
            valuePropName="checked"
            name={[...(Array.isArray(name) ? name : [name]), key]}
            // {...nestedItemLayout}
          >
            <Checkbox>{label}</Checkbox>
          </Form.Item>
        );
      })}
    </Form.Item>
  );
};

type DateInputProps = {
  value?: string | null;
  onChange?: (m: string | null) => void;
};
const DateInput: React.FunctionComponent<
  DateInputProps & Omit<DatePickerProps, 'value' | 'onChange'>
> = ({ value, onChange, ...datePickerProps }) => {
  const onDatePickerValueChange = (date: Moment | null) => {
    if (onChange) onChange(date?.format() || null);
  };
  return (
    <DatePicker
      value={value ? moment(value) : null}
      onChange={onDatePickerValueChange}
      {...datePickerProps}
    />
  );
};
