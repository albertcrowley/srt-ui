// spec.js
const {browser, element} = require('protractor')

describe('SRT App', function() {

  it('should timeout ', async function(done) {

    if ( process.env.VERY_LONG_TESTS ) {


      browser.get('http://localhost:4200/');
      browser.waitForAngular();
      let el2 = element(by.xpath("//button[contains(.,'Login with MAX')]"))
      expect(el2.isDisplayed()).toBeTruthy();

      element(by.xpath("//button[contains(.,'Login with MAX')]")).click();

      let EC = protractor.ExpectedConditions;
      // await browser.wait(EC.presenceOf(element(by.xpath("//a[contains(.,'Hello'')]"))));
      // expect(element(by.xpath("//a[contains(.,'Hello'')]")).isPresent).toBeTruthy();

      console.log ("about to wait");
      await browser.wait(EC.urlContains('home'), 15000);
      expect(element(by.xpath("//a[contains(.,'Hello'')]")).isDisplayed).toBeTruthy();
      console.log ("post wait");

      // session length expected to be 60 seconds with a 15 second individual token timeout
      // await browser.sleep(10000);

      await browser.sleep(2000);
      console.log("clicking");
      let manage_el = element(by.xpath("//li[@ng-reflect-router-link='/solicitation/report']"));
      console.log ("tag name", manage_el.getTagName());
      manage_el.click();
      // await browser.sleep(10000);

      console.log("clicking");
      element(by.xpath("//a[contains(.,'Feedback')]")).click();
      // await browser.sleep(10000);

      console.log("clicking");
      element(by.xpath("//a[contains(.,'Manage/Review Workload')]")).click();
      // await browser.sleep(10000);

      console.log("clicking");
      element(by.xpath("//a[contains(.,'Feedback')]")).click();
      // await browser.sleep(10000);

      console.log("clicking");
      element(by.xpath("//a[contains(.,'Manage/Review Workload')]")).click();
      // await browser.sleep(11000);


      expect(element(by.xpath("//button[contains(.,'Login with MAX')]")).isDisplayed()).toBeTruthy();


      done();
    }


  }, 60000000);

});

