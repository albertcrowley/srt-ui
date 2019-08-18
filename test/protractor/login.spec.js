// spec.js
const {browser, element} = require('protractor')

describe('SRT App', function() {
  it('should have a login page', function() {
    browser.get('http://localhost:4200/');
    expect(browser.getTitle()).toEqual('Solicitation Review Tool');
    expect(element(by.xpath("//button[contains(.,'Login with MAX')]")).getText()).toContain('Login')
  });

  it('should login', function() {
    browser.get('http://localhost:4200/');
    element(by.xpath("//button[contains(.,'Login with MAX')]")).click();
    expect(element(by.xpath("//a[contains(.,'Hello'')]")).isPresent).toBeTruthy();
  });

  it('should resume a session', function() {
    browser.get('http://localhost:4200/');
    expect(element(by.xpath("//a[contains(.,'Hello'')]")).isPresent).toBeTruthy();
  });


  it('should timeout ', function() {

    let browser2 = browser.forkNewDriverInstance();
    browser2.get('http://localhost:4200/');
    browser2.waitForAngular();
    let el2 = browser2.element(by.xpath("//button[contains(.,'Login with MAX')]"))
    expect(el2.isDisplayed()).toBeTruthy();
  });

});

