const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Login page",function(){
            let loginButton,username,password;

            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
                await page.visit("http://localhost:3000/login");
                loginButton = await page.findByXpath("//input[@type = 'submit']")                
                username = await page.findByName("username");
                password = await page.findByName("password");
            })

            afterEach(async function(){
                let currentUrl = await page.getCurrentUrl();
                // check whether it redirects to login page
                expect(currentUrl.includes("login")).toBe(true);
                await page.quit();
            })

            it("should not login if username and password is not provided",async function(){
                await loginButton.click();
                console.log("\nLogin Page should not login if username and password is not provided")
            })

            it("should not login if only username is provided",async function(){
                await username.sendKeys("logan");
                await loginButton.click();
                console.log("\nLogin Page should not login if only username is provided")
            })

            it("should not login if only password is provided",async function(){
                await password.sendKeys("logan");
                await loginButton.click();
                console.log("\nLogin Page should not login if only password is provided")
            })
        })
    } catch (error) {
        console.log(error)
    }
})();
