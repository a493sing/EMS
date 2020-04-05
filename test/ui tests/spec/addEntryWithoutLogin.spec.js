const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Adding Venue/Caterer/Decoration without login",function(){
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
            })

            afterEach(async function(){
                await page.quit();
            })

            it("should not add new venue without logging in",async function(){
                await page.visit("http://localhost:3000/venues");
                let addNewVenue = await page.findByLinkText("Add New Venue")
                
                await addNewVenue.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl) // https://thawing-headland-37322.herokuapp.com/login
                
                console.log("\nshould not add new venue without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("should not add new caterer without logging in",async function(){
                await page.visit("http://localhost:3000/catering");
                let addNewCaterer = await page.findByLinkText("Add A New Caterer")
                
                await addNewCaterer.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl) 
                
                console.log("\nshould not add new caterer without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })

            it("should not add new decorator without logging in",async function(){
                await page.visit("http://localhost:3000/decorations");
                let addNewDecorator = await page.findByLinkText("Add New Decorator")
                
                await addNewDecorator.click();

                // get url of current
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl) 
                
                console.log("\nshould not add new decorator without logging in")
                expect(currentUrl.includes("login")).toBe(true);
            })
        })
    } catch (error) {
        console.log(error);
    }
})();
