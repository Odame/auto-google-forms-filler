import { EipHop } from 'eiphop';
import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import { sleep } from './utils';
import IGeneratedData from './features/generateData/types';

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

const submitGoogleForm: EipHop.Action<IGeneratedData, void> = async (
  req,
  res
) => {
  if (!isChromeDriverConfigured) {
    res.error(chromeConfigError);
    return;
  }

  const chromeOptions = new chrome.Options();
  // .addArguments('start-fullscreen');
  const driver = await new Builder()
    .setChromeOptions(chromeOptions)
    .forBrowser('chrome')
    .build();

  try {
    await driver.get('https://princeodame.com');
    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

    await sleep(5000);
    await driver.quit();
    res.send();
  } catch (err) {
    res.error(err);
  }
};

export default submitGoogleForm;
