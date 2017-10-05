import {browser, by, element} from "protractor";

export class NewsPortalEndToEndHomePage {
  navigateTo() {
    return browser.get('/');
  }

  getNewsButtonText() {
    return element(by.css('md-toolbar button:first-child')).getText();
  }
}
