import { browser, by, element, ElementFinder, ProtractorExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  private EC: ProtractorExpectedConditions;
  private timeout = 10000;

  constructor() {
    this.EC = protractor.ExpectedConditions;
  }

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async enterValueOnField(fieldName: string, value: string): Promise<unknown> {
    return element(by.id(fieldName)).sendKeys(value);
  }

  async submitForm(): Promise<unknown> {
    const submit: ElementFinder = element(by.id('submit'));

    browser.wait(this.EC.elementToBeClickable(submit), this.timeout);
    return submit.click();
  }

  async isButtonEnabled(): Promise<unknown> {
    const submit: ElementFinder = element(by.id('submit'));

    return submit.isEnabled();
  }

  async isConfirmationAlertPresent(): Promise<unknown> {
    const alert: ElementFinder = element(by.css('.toast-success'));

    browser.wait(this.EC.visibilityOf(alert), this.timeout);
    return alert.isPresent();
  }
}
