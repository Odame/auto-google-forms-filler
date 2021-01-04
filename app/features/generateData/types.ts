import { exhaustiveStringTuple } from '../../utils';

type Department = 'DnM' | 'WSV' | 'BDT' | 'CPL' | 'Production';
type ISex = 'male' | 'female' | 'preferNotToSay';
type IMaritalStatus = 'married' | 'single';
export type IAgeRange =
  | 'from18To25'
  | 'from25To35'
  | 'from35To45'
  | 'from45To55'
  | 'from55To60'
  | 'over60';
export const ageRangesNum: Record<IAgeRange, [number, number]> = {
  from18To25: [18, 24],
  from25To35: [25, 34],
  from35To45: [35, 44],
  from45To55: [45, 54],
  from55To60: [55, 59],
  over60: [60, 100],
};

export type IWorkExperienceRange =
  | 'from1To5'
  | 'from5To10'
  | 'from10To15'
  | 'from15To20'
  | 'from20To25'
  | 'above26';
export const workExperienceRangesNum: Record<
  IWorkExperienceRange,
  [number, number]
> = {
  from1To5: [1, 4],
  from5To10: [5, 9],
  from10To15: [10, 14],
  from15To20: [15, 19],
  from20To25: [20, 24],
  above26: [25, 100], // 100 is used to represent a large value for a work experience
};

type IEducationLevel =
  | 'certificate'
  | 'diploma'
  | 'undergraduateDiploma'
  | 'postgraduateDiploma';
export type YesNoMaybe = 'yes' | 'no' | 'maybe';

export type IScaleOf5 = 1 | 2 | 3 | 4 | 5;

export type FourOptions = 'a' | 'b' | 'c' | 'd';
export type SixOptions = FourOptions | 'e' | 'f';
export type SevenOptions = SixOptions | 'g';

type MultiSelectOption4 = Record<FourOptions, boolean>;
type MultiSelectOption6 = Record<SixOptions, boolean>;
type MultiSelectOption7 = Record<SevenOptions, boolean>;

export type YesNo = 'yes' | 'no';
export type YearDivision = 'monthly' | 'quarterly' | 'yearly';

export default interface IGeneratedData {
  /** 1. Name of department */
  one: Department;
  /** 2. Sex */
  two: ISex;
  /** 2. Specify sex if other is chosen */
  twoOther?: string;
  /** 3. Marital status */
  three: IMaritalStatus;
  /** 4. Ages */
  four: IAgeRange;
  /** 5. Education level */
  five: IEducationLevel;
  /** 6. Work experience. */
  six: IWorkExperienceRange;
  /** How many years you have been working with ENI? Please specify  */
  seven: number;
  /** 8. Are you aware of the training and development concept?  */
  eight: YesNoMaybe;
  /** 9. What is your understanding of training and development? Select all that apply. */
  nine: MultiSelectOption4;
  /** 10. Is training and development part of your organization policy? */
  ten: YesNo;
  /** 11. Does ENI offer training opportunities to its staff? */
  eleven: YesNo;
  /** 12. If your answer in the above is yes, please state the kind of training offered */
  twelve: MultiSelectOption4;
  /** 13. Does ENI provide room for growth after training their staff? */
  thirteen: YesNo;
  /** 14. Are there promotional opportunities available to employee at ENI after training? */
  fourteen: YesNoMaybe;
  /** 15. What are the chances of being promoted after training? */
  fifteen: IScaleOf5;
  /** 16. What criteria are used by Management to select employees for training? Select all that apply */
  sixteen: MultiSelectOption7;
  /** 17. What are the criteria used for promotion? Select all that apply * */
  seventeen: MultiSelectOption6;
  /** 18. To what extent do the training and development programs meet individual career development? */
  eighteen: IScaleOf5;
  /** 19. What are the shortfall of the Training programs offered at ENI? Select all that apply */
  nineteen: MultiSelectOption6;
  /** 20. Are training's aligned with the organizational; objectives in career development programs?  */
  twenty: YesNoMaybe;
  /** 21. How does training and development contribute to the employees’ career?  */
  twentyOne: MultiSelectOption4;
  /** 22. What is the cost incurred in the process of implementing the training and development policy?
   * On a scale of very low to very high  */
  twentyTwo: IScaleOf5;
  /** 23. Are there visible positive outcomes after training's in the employees’ career?  */
  twentyThree: YesNo;
  /** 24. Does ENI welcome ideas to improve already existing career training and development programs? */
  twentyFour: YesNo;
  /** 25. How regular are these ideas welcomed?  */
  twentyFive: YearDivision;
  /** 26. Please select the most applicable measures that currently exist to improve career development from the list below.
   * Select all that apply */
  twentySix: MultiSelectOption7;
  /** 27. Please select the most applicable measure to be taken to improve individual career development from the list below.
   * Select all that apply  */
  twentySeven: MultiSelectOption7;
  /** 28. Any other comments where necessary */
  twentyEight: string;
  /** Please Indicate the date for the completion of this Survey. */
  dateOfCompletion: string;
}

const fourMultiSelectChoices = exhaustiveStringTuple<FourOptions>()(
  'a',
  'b',
  'c',
  'd'
);
/** The possible options for single-select multiple-choice data fields.
 *
 * NB: The options for each data field is in the same order of appearance in the Google Form
 */
export const dataFieldChoices = {
  one: ['DnM', 'WSV', 'BDT', 'CPL', 'Production'] as Array<Department>,
  two: exhaustiveStringTuple<ISex>()('female', 'male', 'preferNotToSay'),
  twoOther: ['Agender', 'Androgyne', 'Bigender'],
  three: ['married', 'single'] as Array<IMaritalStatus>,
  four: exhaustiveStringTuple<IAgeRange>()(
    'from18To25',
    'from25To35',
    'from35To45',
    'from45To55',
    'from55To60',
    'over60'
  ),
  five: exhaustiveStringTuple<IEducationLevel>()(
    'certificate',
    'diploma',
    'undergraduateDiploma',
    'postgraduateDiploma'
  ),
  six: exhaustiveStringTuple<IWorkExperienceRange>()(
    'from1To5',
    'from5To10',
    'from10To15',
    'from15To20',
    'from20To25',
    'above26'
  ),
  twentyFive: exhaustiveStringTuple<YearDivision>()(
    'monthly',
    'quarterly',
    'yearly'
  ),
  yesNoMaybe: exhaustiveStringTuple<YesNoMaybe>()('yes', 'no', 'maybe'),
  yesNo: exhaustiveStringTuple<YesNo>()('yes', 'no'),
  fourMultiSelect: fourMultiSelectChoices,
  sixMultiSelect: exhaustiveStringTuple<SixOptions>()(
    ...fourMultiSelectChoices,
    'e',
    'f'
  ),
  sevenMultiSelect: exhaustiveStringTuple<SevenOptions>()(
    ...fourMultiSelectChoices,
    'e',
    'f',
    'g'
  ),
  scaleOf5: [1, 2, 3, 4, 5] as Array<IScaleOf5>,
};
