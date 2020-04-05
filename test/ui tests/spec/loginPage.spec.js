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
                await page.quit();
            })

            it("should not login if username and password is not provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);
                console.log("\nLogin Page should not login if username and password is not provided")
            })

            it("should not login if only username is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await username.sendKeys("logan");
                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);
                console.log("\nLogin Page should not login if only username is provided")
            })

            it("should not login if only password is provided",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                await password.sendKeys("logan");
                await loginButton.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                console.log("\nLogin Page should not login if only password is provided")
            })

            it("should go back to home", async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                let goBackLink = await page.findByLinkText("Go Back")                
                await goBackLink.click();

                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(false);
            })

            it("should redirect to register page",async function(){
                let currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("login")).toBe(true);

                let registerLink = await page.findByLinkText("Register")
                await registerLink.click();
                
                currentUrl = await page.getCurrentUrl();
                console.log(currentUrl);
                expect(currentUrl.includes("register")).toBe(true);
            })

        })
    } catch (error) {
        console.log(error)
    }
})();
