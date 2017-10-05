import {NewsPortalEndToEndHomePage} from "./app.po";
import {browser, element, by} from 'protractor';

describe('e2eproject App', () => {
  let page: NewsPortalEndToEndHomePage;

  beforeEach(() => {
    page = new NewsPortalEndToEndHomePage();
  });

  it('should display two articles on the home page', () => {
    browser.get("/");
    let articleTitles = element.all(by.css("md-card-title"));
    expect(articleTitles.count()).toEqual(2);
  });

  it('request another articles from back-end', () => {
    browser.get("/");
    let moreNewsButton = element(by.css(".moreArticles"));
    moreNewsButton.click();
    let articleTitles = element.all(by.css("md-card-title"));
    expect(articleTitles.count()).toEqual(4);
  });
});
