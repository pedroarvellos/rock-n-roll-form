import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Form tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create a user', async () => {
    await page.navigateTo();
    await page.enterValueOnField('firstName', 'Thomas');
    await page.enterValueOnField('lastName', 'Shelby');
    await page.enterValueOnField('email', 'thomas@shelby.co.uk');
    await page.enterValueOnField('password', 'IAmNotBillyKimber876');
    await page.submitForm()
    expect(await page.isConfirmationAlertPresent()).toBe(true);
  });

  it('should not create a user with the password containing the first and last names', async () => {
    await page.navigateTo();
    await page.enterValueOnField('firstName', 'Thomas');
    await page.enterValueOnField('lastName', 'Shelby');
    await page.enterValueOnField('email', 'thomas@shelby.co.uk');
    await page.enterValueOnField('password', 'ThomasShelby123');
    expect(await page.isButtonEnabled()).toBe(false);
  });

  it('should not create a user with wrong email', async () => {
    await page.navigateTo();
    await page.enterValueOnField('firstName', 'Thomas');
    await page.enterValueOnField('lastName', 'Shelby');
    await page.enterValueOnField('email', 'thomas@shelby');
    await page.enterValueOnField('password', 'IAmNotBillyKimber876');
    expect(await page.isButtonEnabled()).toBe(false);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
