const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {

        describe("YelpCamp Home Page",function(){
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
                await page.visit("http://localhost:3000");
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not add new campground without logging in",async function(){
                let addCampgroundButton = await page.findByLinkText("Add new campground")

                await addCampgroundButton.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl) // https://thawing-headland-37322.herokuapp.com/login
                
                console.log("\nshould not add new campground without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })
        })
    } catch (error) {
        console.log(error);
    }
})();
