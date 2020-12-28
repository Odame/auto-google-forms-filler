import { Button, Progress, Result, Typography } from 'antd';
import { replace } from 'connected-react-router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTypedSelector } from '../../store';
import { setGeneratedData } from './generatedDataSlice';
import IGeneratedData, {
  dataFieldChoices,
  FourOptions,
  IScaleOf5,
  SevenOptions,
  SixOptions,
  workExperienceRangesNum,
  ageRangesNum,
  YearDivision,
  YesNo,
  YesNoMaybe,
  IAgeRange,
  IWorkExperienceRange,
} from './types';
import routes from '../../constants/routes.json';
import styles from './GenerateData.css';

const { Text } = Typography;

/** Randomly select a single item from an array of choices */
const randomChoice = <T extends unknown>(choices: Array<T>): T => {
  return choices[Math.floor(Math.random() * choices.length)];
};
const randBool = () => randomChoice([true, false]);
const randYesNo = () => randomChoice<YesNo>(['yes', 'no']);
const randYesNoMaybe = () => randomChoice<YesNoMaybe>(['yes', 'no', 'maybe']);
const randScale5 = () => randomChoice<IScaleOf5>([1, 2, 3, 4, 5]);
const randInt = (min: number, max: number) => {
  if (min > max) throw Error('min is greater than max');
  const choices: Array<number> = [];
  const maxInt = Math.floor(max);
  for (let i = Math.floor(min); i <= maxInt; i += 1) {
    choices.push(i);
  }
  return randomChoice(choices);
};

/** Get a random work experience, based in age range */
const randomWorkExperience = (age: IAgeRange): IWorkExperienceRange => {
  const [, ageMax] = ageRangesNum[age];
  /** The maximum work experience that can be achieved based on age range */
  const maxPossibleWorkExperience = Math.max(1, ageMax - 20);
  const choices = Object.entries(workExperienceRangesNum).reduce<
    IWorkExperienceRange[]
  >((prev, curr) => {
    const [range, [, max]] = curr;
    if (max <= maxPossibleWorkExperience)
      return [...prev, range as IWorkExperienceRange];
    return prev;
  }, [] as Array<IWorkExperienceRange>);
  return randomChoice(choices);
};

const generateRandomData = () => {
  const sex = randomChoice(dataFieldChoices.two);
  const age = randomChoice(dataFieldChoices.four);
  const workExperience = randomWorkExperience(age);
  const isTrainingOfferedByENI = randYesNo();
  const data: IGeneratedData = {
    one: randomChoice(dataFieldChoices.one),
    two: sex,
    twoOther:
      sex === 'other' ? randomChoice(dataFieldChoices.twoOther) : undefined,
    three: randomChoice(dataFieldChoices.three),
    four: age,
    five: randomChoice(dataFieldChoices.five),
    six: workExperience,
    // must have worked at least 1 year for ENI, but not more than total work experience
    seven: randInt(1, workExperienceRangesNum[workExperience][1]),
    eight: randomChoice(dataFieldChoices.eight),
    nine: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
    },
    ten: randYesNo(),
    eleven: isTrainingOfferedByENI,
    twelve: {
      a: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      b: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      c: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      d: isTrainingOfferedByENI === 'yes' ? randBool() : false,
    },
    thirteen: isTrainingOfferedByENI === 'yes' ? randYesNo() : 'no',
    fourteen: randYesNoMaybe(),
    fifteen: randScale5(),
    sixteen: {
      a: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      b: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      c: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      d: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      e: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      f: isTrainingOfferedByENI === 'yes' ? randBool() : false,
      g: isTrainingOfferedByENI === 'yes' ? randBool() : false,
    },
    seventeen: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
      e: randBool(),
      f: randBool(),
    },
    eighteen: randScale5(),
    nineteen: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
      e: randBool(),
      f: randBool(),
    },
    twenty: randYesNoMaybe(),
    twentyOne: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
    },
    twentyTwo: randScale5(),
    twentyThree: randYesNo(),
    twentyFour: randYesNo(),
    twentyFive: randomChoice<YearDivision>(['monthly', 'quarterly', 'yearly']),
    twentySix: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
      e: randBool(),
      f: randBool(),
      g: randBool(),
    },
    twentySeven: {
      a: randBool(),
      b: randBool(),
      c: randBool(),
      d: randBool(),
      e: randBool(),
      f: randBool(),
      g: randBool(),
    },
    twentyEight: '',
    dateOfCompletion: moment().format(),
  };

  // for multi select fields, randomly explicitly set one of them to true
  // since it is a required field
  data.nine[randomChoice<FourOptions>(['a', 'b', 'c', 'd'])] = true;
  data.twelve[randomChoice<FourOptions>(['a', 'b', 'c', 'd'])] = true;
  data.sixteen[
    randomChoice<SevenOptions>(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  ] = true;
  data.seventeen[
    randomChoice<SixOptions>(['a', 'b', 'c', 'd', 'e', 'f'])
  ] = true;
  data.nineteen[
    randomChoice<SixOptions>(['a', 'b', 'c', 'd', 'e', 'f'])
  ] = true;
  data.twentyOne[randomChoice<FourOptions>(['a', 'b', 'c', 'd'])] = true;
  data.twentySix[
    randomChoice<SevenOptions>(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  ] = true;
  data.twentySeven[
    randomChoice<SevenOptions>(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  ] = true;

  return data;
};

const sleep = async (timeMs: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
};

const GenerateData: React.FunctionComponent = () => {
  const numSamples = useTypedSelector((state) => state.controlPanel.numSamples);
  const shouldShowPreview = useTypedSelector(
    (state) => state.controlPanel.preEdit
  );
  const refs = useRef({
    numSamples,
    shouldShowPreview,
  });

  const [error, setHasError] = useState(false);

  const dispatch = useDispatch();
  const [totalSamplesGenerated, setTotalSamplesGenerated] = useState(0);
  useEffect(() => {
    if (error) return;

    let isComponentMounted = true;
    const numDataSamples = refs.current.numSamples;
    const showPreview = refs.current.shouldShowPreview;

    (async () => {
      const dataArray: Array<IGeneratedData> = [];
      /** Intentional delay causing the progress bar to be animated by 2-4 seconds
       */
      const intentionalDelay =
        (Math.max(1, Math.min(0.75 * numDataSamples, 2)) / numDataSamples) *
        1000;
      // stop generating data if component is no longer mounted
      for (let i = 0; isComponentMounted && i < numDataSamples; i += 1) {
        const data = generateRandomData();
        dataArray.push(data);
        // eslint-disable-next-line no-await-in-loop
        await sleep(intentionalDelay);
        // make sure the component is still mounted before updating state
        if (isComponentMounted) setTotalSamplesGenerated((c) => c + 1);
      }
      return dataArray;
    })()
      .then((data) => {
        // make sure component is still mounted before dispatching actions
        if (isComponentMounted) {
          dispatch(setGeneratedData(data));
          setTimeout(() => {
            if (!isComponentMounted) return;

            if (showPreview) {
              // go to preview page
              dispatch(replace(routes.PREVIEW));
            } else {
              // go to submission page
              dispatch(replace(routes.SUBMISSION));
            }
          }, 700);
        }
        return data;
      })
      .catch((err) => {
        // make sure component is still mounted before updating state
        if (isComponentMounted) {
          setHasError(true);
        }
        // eslint-disable-next-line no-console
        console.error('There were some problems with generating data.');
        // eslint-disable-next-line no-console
        console.error(err);
      });

    // eslint-disable-next-line consistent-return
    return () => {
      // when the component is un-mounting
      isComponentMounted = false;
    };
  }, [dispatch, error]);

  return (
    <div className={styles.generateData}>
      {error ? (
        <Result
          status="warning"
          title="There were some problems with generating data."
          extra={
            <Link to={routes.HOME}>
              <Button type="primary" key="console" icon={<LeftOutlined />}>
                Back
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <Progress
            type="circle"
            percent={Math.floor((totalSamplesGenerated / numSamples) * 100)}
          />
          <Text className={styles.progressText}>
            {totalSamplesGenerated === numSamples
              ? 'Completed'
              : 'Generating data ...'}
          </Text>
          {totalSamplesGenerated !== numSamples ? (
            <Link to={routes.HOME}>
              <Button type="default" danger icon={<CloseCircleOutlined />}>
                Cancel
              </Button>
            </Link>
          ) : (
            // unused button, just to enure visual consistency when transitioning to "completed" state
            <Button className={styles.ghostButton} type="ghost" />
          )}
        </>
      )}
    </div>
  );
};

export default GenerateData;
