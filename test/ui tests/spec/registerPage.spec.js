const Page = require("../lib/basePage");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // in microseconds.

(async function test(){
    try {
        describe("Sign Up page",function(){
            let signupButton,username,password;
            
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.setTimeouts(10000);
                await page.visit("http://localhost:3000/register");
                username = await page.findByName("username");
                password = await page.findByName("password");
                signupButton = await page.findByXpath("//input[@type = 'submit']");
            })

            afterEach(async function(){
                let currentUrl = await page.getCurrentUrl();
                // check whether it redirects to signup page
                expect(currentUrl.includes("register")).toBe(true);
                await page.quit();
            })

            it("should not signup if username and password is not provided",async function(){
                await signupButton.click();
                console.log("Sign Up page should not signup if username and password is not provided")
            })

            it("should not signup if only username is provided",async function(){
                await username.sendKeys("logan")
                signupButton.click();
                console.log("\n Sign Up page should not signup if only username is provided")
            })

            it("should not signup if only password is provided",async function(){
                await password.sendKeys("logan")
                signupButton.click();
                console.log("\n Sign Up page should not signup if only password is provided")
            })

        })
    } catch (error) {
        console.log(error)
    }
})();
