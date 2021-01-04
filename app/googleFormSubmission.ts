/* eslint-disable no-await-in-loop */
import { EipHop } from 'eiphop';
import { Builder, By, until, WebDriver, WebElement } from 'selenium-webdriver';
import chrome, { Driver } from 'selenium-webdriver/chrome';
import path from 'path';
import moment from 'moment';
import { sleep } from './utils';
import IGeneratedData, {
  dataFieldChoices,
} from './features/generateData/types';

let isChromeDriverConfigured = false;
let chromeConfigError: Error | null = null;
export const configChromeDriver = () => {
  if (isChromeDriverConfigured) return;

  try {
    const configuredPathSuffixes: Partial<Record<NodeJS.Platform, string>> = {
      darwin: '_mac',
      win32: '_win.exe',
      linux: '_linux',
    };
    const pathSuffix = configuredPathSuffixes[process.platform];
    const chromeDriverPath =
      process.env.NODE_ENV === 'development'
        ? path.normalize(
            `${__dirname}/../chromedrivers/chromedriver${pathSuffix}`
          )
        : path.normalize(`${process.resourcesPath}/chromedriver${pathSuffix}`);
    chrome.setDefaultService(
      new chrome.ServiceBuilder(chromeDriverPath).build()
    );
    isChromeDriverConfigured = true;
    chromeConfigError = null;
  } catch (error) {
    isChromeDriverConfigured = false;
    chromeConfigError = error;
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const FORM_URL =
  // 'https://forms.gle/JJHqfhTviTvd765R9';
  'https://docs.google.com/forms/d/e/1FAIpQLSdFSsHApG3IthawUjXaRBH9SiP0n2ytISvIz3xnsN3VWDnIDA/viewform?hl=us';

const findNavButtonWithLabel = async (
  driver: WebDriver,
  label: string | string[]
) => {
  const testLabels = Array.isArray(label)
    ? label.map((l) => l.toLowerCase())
    : [label.toLowerCase()];
  const navButtons = await driver.findElements(
    By.css(
      '.appsMaterialWizButtonEl.appsMaterialWizButtonPaperbuttonEl.appsMaterialWizButtonPaperbuttonProtected' +
        '.freebirdFormviewerViewNavigationNoSubmitButton.freebirdThemedProtectedButtonM2'
    )
  );
  let foundButton: WebElement | undefined;
  for (let i = 0; i < navButtons.length; i += 1) {
    const button = navButtons[i];
    const labelElement = await button.findElement(
      By.css(
        '.appsMaterialWizButtonPaperbuttonLabel.quantumWizButtonPaperbuttonLabel.exportLabel'
      )
    );
    const labelElementText = (await labelElement.getText()).toLowerCase();
    if (testLabels.indexOf(labelElementText) !== -1) {
      foundButton = button;
      break;
    }
  }
  if (foundButton === undefined)
    throw Error(`Cannot find nav button with label: '${label}' in DOM`);
  return foundButton;
};

const clickNext = async (driver: WebDriver) => {
  const nextButton = await findNavButtonWithLabel(driver, ['next', 'næste']);
  nextButton.click();
};

// const clickBack = async (driver: WebDriver) => {
//   const backButton = await findNavButtonWithLabel(driver, ['back', 'tilbage']);
//   backButton.click();
// };

const waitPageLoaded = async (driver: WebDriver, timeoutMs = 1000) => {
  await sleep(500); // wiggle room to make sure the previous page/section is gone
  await driver.wait(
    until.elementLocated(By.css('div.freebirdFormviewerViewHeaderTitle')),
    timeoutMs,
    `Page did not finish loading after timeout of ${timeoutMs}`
  );
};

const findSectionFormItems = async (driver: WebDriver) => {
  const formItemsContainer = await driver.wait(
    until.elementLocated(By.css('div.freebirdFormviewerViewItemList')),
    3000
  );
  const formItems = await formItemsContainer.findElements(
    By.css('div.freebirdFormviewerViewNumberedItemContainer')
  );
  return formItems.slice(1);
};

/** Select a radio option from a radio group in a form item.
 * The form item should contain only one radio group */
const checkRadioFormItem = async <T>(
  formItem: WebElement,
  optionToSelect: T,
  optionsInOrder: Array<T>
) => {
  const radioButtons = await formItem.findElements(
    By.css('div.appsMaterialWizToggleRadiogroupEl')
  );
  if (radioButtons.length === 0) throw Error('No radio buttons were found');
  if (optionsInOrder.length > radioButtons.length)
    throw Error(
      `There are more options in '${optionsInOrder}' than the '${radioButtons.length}' found radio buttons`
    );
  const i = optionsInOrder.indexOf(optionToSelect);
  if (i === -1)
    throw Error(`Cannot find '${optionToSelect}' in '${optionsInOrder}'`);
  await radioButtons[i].click();
};

const checkMultiSelectFormItem = async <T extends string | number>(
  formItem: WebElement,
  selectedOptions: Record<T, boolean>,
  optionsInOrder: Array<T>
) => {
  const checkboxes = await formItem.findElements(
    By.css('div.quantumWizTogglePapercheckboxEl')
  );
  if (checkboxes.length === 0) throw Error('No checkboxes were found');
  if (Object.keys(selectedOptions).length > checkboxes.length)
    throw Error(
      `There are more options in '${optionsInOrder}' than the '${checkboxes.length}' found checkboxes`
    );
  for (let i = 0; i < optionsInOrder.length; i += 1) {
    if (selectedOptions[optionsInOrder[i]] === true) {
      await checkboxes[i].click();
    }
  }
};

/** Write text in a form field containing only a single text field */
const inputText = async (formItem: WebElement, text: string) => {
  const inputElement = await formItem.findElement(
    By.css('input.quantumWizTextinputPaperinputInput')
  );
  await inputElement.click().then(() => sleep(500));
  await inputElement.clear();
  await inputElement.sendKeys(text);
};

type AutofillFunc = (driver: WebDriver, data: IGeneratedData) => Promise<void>;

const autofillSectionA: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);

  await inputText(formItems[0], data.one);
  await checkRadioFormItem(formItems[1], data.two, dataFieldChoices.two);
  await checkRadioFormItem(formItems[2], data.three, dataFieldChoices.three);
  await checkRadioFormItem(formItems[3], data.four, dataFieldChoices.four);
  await checkRadioFormItem(formItems[4], data.five, dataFieldChoices.five);
  await checkRadioFormItem(formItems[5], data.six, dataFieldChoices.six);
};

const autoFillSectionB: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);
  await inputText(formItems[0], data.seven.toString());
  await checkRadioFormItem(
    formItems[1],
    data.eight,
    dataFieldChoices.yesNoMaybe
  );
  await checkMultiSelectFormItem(
    formItems[2],
    data.nine,
    dataFieldChoices.fourMultiSelect
  );
  await checkRadioFormItem(formItems[3], data.ten, dataFieldChoices.yesNo);
  await checkRadioFormItem(formItems[4], data.eleven, dataFieldChoices.yesNo);
  await checkMultiSelectFormItem(
    formItems[5],
    data.twelve,
    dataFieldChoices.fourMultiSelect
  );
  await checkRadioFormItem(formItems[6], data.thirteen, dataFieldChoices.yesNo);
};

const autoFillSectionC: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);
  await checkRadioFormItem(
    formItems[0],
    data.fourteen,
    dataFieldChoices.yesNoMaybe
  );
  await checkRadioFormItem(
    formItems[1],
    data.fifteen,
    dataFieldChoices.scaleOf5
  );
  await checkMultiSelectFormItem(
    formItems[2],
    data.sixteen,
    dataFieldChoices.sevenMultiSelect
  );
  await checkMultiSelectFormItem(
    formItems[3],
    data.seventeen,
    dataFieldChoices.sixMultiSelect
  );
  await checkRadioFormItem(
    formItems[4],
    data.eighteen,
    dataFieldChoices.scaleOf5
  );
  await checkMultiSelectFormItem(
    formItems[5],
    data.nineteen,
    dataFieldChoices.sixMultiSelect
  );
};

const autofillSectionD: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);
  await checkRadioFormItem(
    formItems[0],
    data.twenty,
    dataFieldChoices.yesNoMaybe
  );
  await checkMultiSelectFormItem(
    formItems[1],
    data.twentyOne,
    dataFieldChoices.fourMultiSelect
  );
  await checkRadioFormItem(
    formItems[2],
    data.twentyTwo,
    dataFieldChoices.scaleOf5
  );
  await checkMultiSelectFormItem(
    formItems[3],
    { yes: false, no: false, [data.twentyThree]: true },
    dataFieldChoices.yesNo
  );
};

const autofillSectionE: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);
  await checkRadioFormItem(
    formItems[0],
    data.twentyFour,
    dataFieldChoices.yesNo
  );
  await checkRadioFormItem(
    formItems[1],
    data.twentyFive,
    dataFieldChoices.twentyFive
  );
  await checkMultiSelectFormItem(
    formItems[2],
    data.twentySix,
    dataFieldChoices.sevenMultiSelect
  );
  await checkMultiSelectFormItem(
    formItems[3],
    data.twentySeven,
    dataFieldChoices.sevenMultiSelect
  );
};

const autofillSectionF: AutofillFunc = async (driver, data) => {
  const formItems = await findSectionFormItems(driver);

  const dateInput = await formItems[1].findElement(
    By.css('input.quantumWizTextinputPaperinputInput')
  );
  await driver.executeScript(
    `function focusDateInput(){
      var dateInput = arguments[0];
      dateInput.focus();
    }`,
    dateInput
  );
  await sleep(500);
  await dateInput.sendKeys(moment(data.dateOfCompletion).format('MMDDYYYY'));
};

/** Functions to use to autofill data for the various sections of the Google Form,
 * IN ORDER!  */
const sectionsAutofillFuncs: Array<AutofillFunc> = [
  autofillSectionA,
  autoFillSectionB,
  autoFillSectionC,
  autofillSectionD,
  autofillSectionE,
  autofillSectionF,
];

const submitGoogleForm: EipHop.Action<[IGeneratedData, boolean], void> = async (
  req,
  res
) => {
  const [data, isHeadless] = req.payload;
  let driver: WebDriver | undefined;
  try {
    if (!isChromeDriverConfigured) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw chromeConfigError || Error('Chrome driver has not been configured');
    }

    const chromeOptions = new chrome.Options()
      .addArguments('--lang=en')
      .addArguments('--start-maximized');
    if (isHeadless) chromeOptions.addArguments('--headless');

    driver = await new Builder()
      .setChromeOptions(chromeOptions)
      .forBrowser('chrome')
      .build();

    await driver.get(FORM_URL).then(() => sleep(500));
    await driver.manage().window().maximize();

    await waitPageLoaded(driver);
    await clickNext(driver);

    for (let i = 0; i < sectionsAutofillFuncs.length; i += 1) {
      await waitPageLoaded(driver);
      await sectionsAutofillFuncs[i](driver, data);
      await clickNext(driver);
    }

    await waitPageLoaded(driver);
    await sleep(1000);

    res.send();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.error(err);
  } finally {
    await driver?.quit();
  }
};

export default submitGoogleForm;
