const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = "http://localhost:5500"; // Application host (NOT service host - that can be anything)
const interval = 300;
const timeout = 6000;
const DEBUG = false;
const slowMo = 500;


const mockData = {
    "users": [
        {
            "_id": "0001",
            "email": "john@abv.bg",
            "password": "123456",
            "accessToken": "AAAA"
        },
        {
            "_id": "0002",
            "email": "ivan@abv.bg",
            "password": "pass123",
            "accessToken": "BBBB"
        },
        {
            "_id": "0003",
            "email": "peter@abv.bg",
            "password": "123456",
            "accessToken": "CCCC"
        }
    ],

    "catalog": [
        {
            "_id": "1003",
            "_ownerId": "0002",
            "title": 'Deep Breathing to Reduce Stress',
            "imageUrl": '/images/Deep Breathing to Reduce Stress.webp',
            "type": 'Breathing Technique',
            "difficulty": 'Easy',
            "description": 'Practice deep, slow breathing to reduce tension and improve focus. Inhale through your nose for 4 seconds, hold for 7 seconds, and exhale through your mouth for 8 seconds.',
        },
        {
            "_id": "1002",
            "_ownerId": "0002",
            "title": 'Short Walk in Nature',
            "imageUrl": '/images/Short Walk in Nature.webp',
            "type": 'Physical Activity',
            "difficulty": 'Easy',
            "description": 'Take 10-15 minutes to walk in nature to reduce stress and improve your emotional well-being.',
        },
        {
            "_id": "1001",
            "_ownerId": "0001",
            "title": 'Practice Silence and Observe Your Thoughts',
            "imageUrl": '/images/Practice Silence and Observe Your Thoughts.webp',
            "type": 'Meditation',
            "difficulty": 'Medium',
            "description": 'Sit quietly for 10 minutes and observe your thoughts without judgment. This helps develop mindfulness and inner peace.',
        }
    ]

};
const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/mindfultips?sortBy=_createdOn%20desc",
    create: "/data/mindfultips",
    details: (id) => `/data/mindfultips/${id}`,
    delete: (id) => `/data/mindfultips/${id}`,
    own: (itemId, userId) => `/data/mindfultips?where=_id%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,

};

let browser;
let context;
let page;

describe("E2E tests", function () {
    // Setup
    this.timeout(DEBUG ? 120000 : timeout);
    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {});
    });
    after(async () => {
        await browser.close();

    });
    beforeEach(async function () {
        this.timeout(10000);
        context = await browser.newContext();
        setupContext(context);
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });

    // Test proper
    describe("Authentication [ 20 Points ]", function () {
        it("Login does NOT work with empty fields [ 2.5 Points ]", async function () {
            const { post } = await handle(endpoints.login);
            const isCalled = post().isHandled;

            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();

            await page.waitForSelector("form", { timeout: interval });
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);
            expect(isCalled()).to.equal(false, 'Login API was called when form inputs were empty');
        });

        it("Login with valid input makes correct API call [ 2.5 Points ]", async function () {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            const { onRequest } = post(data);

            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();

            //Can check using Ids if they are part of the provided HTML
            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]'),
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });


        it("Login shows alert on fail and does not redirect [ 2.5 Points ]", async function () {
            const data = mockData.users[0];
            const { post } = await handle(endpoints.login);
            let options = { json: true, status: 400 };
            const { onResponse } = post({ message: 'Error 400' }, options);

            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();

            await page.waitForSelector('form', { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);

    
            let alertPromise = new Promise(resolve => {
                page.on('dialog', async dialog => {
                    await dialog.accept();
                    resolve({ type: dialog.type() });
                });
            });
            let errorMessageSpanPromise = page.waitForSelector('#errorBox', { state: 'visible', timeout: interval })
                .then(() => page.$eval('.msg', el => el.textContent))
                .then(text => ({ type: 'error-span', message: text }))
                .catch(() => ({ type: 'none' })); 

            await Promise.all([
                onResponse(),
                page.click('[type="submit"]'),
                Promise.race([alertPromise, errorMessageSpanPromise])
            ]);

           
            await page.waitForSelector('form', { timeout: interval });

          
            let errorIndicator = await Promise.race([alertPromise, errorMessageSpanPromise]);
            if (errorIndicator.type === 'alert') {
                expect(errorIndicator.type).to.equal('alert');
            } else if (errorIndicator.type === 'error-span') { 
                expect(errorIndicator.message).to.include('Error 400');
            } else {
                throw new Error('No error indication received');
            }
        });

        it("Register does NOT work with different passwords [ 2.5 Points ]", async function () {
            const data = mockData.users[1];

            await page.goto(host);

            let registerBtn = await page.waitForSelector('text=Register', { timeout: interval });
            await registerBtn.click();

            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
            let repeatPasswordElement = await page.waitForSelector('[name="re-password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);
            await repeatPasswordElement.fill('nope');

         
            let alertPromise = new Promise(resolve => {
                page.on('dialog', async dialog => {
                    await dialog.accept();
                    resolve({ type: 'alert', message: dialog.message() });
                });
            }).catch(() => ({ type: 'none' }));

       
            let notificationPromise = page.waitForSelector('#errorBox', { state: 'visible', timeout: 5000 })
                .then(() => page.$eval('.msg', el => el.textContent))
                .then(text => ({ type: 'notification', message: text }))
                .catch(() => ({ type: 'none' })); 

          
            await page.click('[type="submit"]');

            let errorIndicator = await Promise.race([alertPromise, notificationPromise]);

      
            if (errorIndicator.type === 'alert') {
             
                expect(errorIndicator.message).to.include('Passwords don\'t match');
            } else if (errorIndicator.type === 'notification') {
                
                expect(errorIndicator.message).to.include('Passwords don\'t match');
            } else {
                throw new Error('No error indication received');
            }

      
        });



        it("Register does NOT work with empty fields [ 2.5 Points ]", async function () {
            const { post } = await handle(endpoints.register);
            const isCalled = post().isHandled;

            await page.goto(host);

            let registerBtn = await page.waitForSelector('text=Register', { timeout: interval });
            await registerBtn.click();

            await page.waitForSelector("form", { timeout: interval });
            await page.click('[type="submit"]');

            await page.waitForTimeout(interval);
            expect(isCalled()).to.be.false;
        });

        it("Register with valid input makes correct API call [ 2.5 Points ]", async function () {
            const data = mockData.users[1];
            const { post } = await handle(endpoints.register);
            const { onRequest } = post(data);

            await page.goto(host);

            let registerBtn = await page.waitForSelector('text=Register', { timeout: interval });
            await registerBtn.click();

            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
            let repeatPasswordElement = await page.waitForSelector('[name="re-password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);
            await repeatPasswordElement.fill(data.password);

            const [request] = await Promise.all([
                onRequest(),
                page.click('[type="submit"]'),
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.email).to.equal(data.email);
            expect(postData.password).to.equal(data.password);
        });
        it("Register shows alert on fail and does not redirect [ 2.5 Points ]", async function () {
            const data = mockData.users[1];
            const { post } = await handle(endpoints.register);
            let options = { json: true, status: 400 };
            const { onResponse } = post({ message: 'Error 409' }, options);

            await page.goto(host);

            let registerBtn = await page.waitForSelector('text=Register', { timeout: interval });
            await registerBtn.click();

            await page.waitForSelector('form', { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
            let repeatPasswordElement = await page.waitForSelector('[name="re-password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);
            await repeatPasswordElement.fill(data.password);

       
            let alertPromise = new Promise(resolve => {
                page.on('dialog', async dialog => {
                    await dialog.accept();
                    resolve({ type: dialog.type() });
                });
            });
            let errorMessageSpanPromise = page.waitForSelector('#errorBox', { state: 'visible', timeout: interval })
                .then(() => page.$eval('.msg', el => el.textContent))
                .then(text => ({ type: 'error-span', message: text })) 
                .catch(() => ({ type: 'none' })); 

            await Promise.all([
                onResponse(),
                page.click('[type="submit"]'),
                Promise.race([alertPromise, errorMessageSpanPromise])
            ]);


            await page.waitForSelector('form', { timeout: interval });


            let errorIndicator = await Promise.race([alertPromise, errorMessageSpanPromise]);
            if (errorIndicator.type === 'alert') {
                expect(errorIndicator.type).to.equal('alert');
            } else if (errorIndicator.type === 'error-span') { 
                expect(errorIndicator.message).to.include('Error 409');
            } else {
                throw new Error('No error indication received');
            }
        });


        it("Logout makes correct API call [ 2.5 Points ]", async function () {
            const data = mockData.users[2];
            const { post } = await handle(endpoints.login);
            const { get } = await handle(endpoints.logout);
            const { onResponse } = post(data);
            const { onRequest } = get("", { json: false, status: 204 });

            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();


            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });

            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);

            await Promise.all([onResponse(), page.click('[type="submit"]')]);

            let logoutBtn = await page.waitForSelector('nav >> text=Logout', { timeout: interval });

            const [request] = await Promise.all([
                onRequest(),
                logoutBtn.click()
            ]);

            const token = request.headers()["x-authorization"];
            expect(request.method()).to.equal("GET");
            expect(token).to.equal(data.accessToken);
        });
    });

    describe("Navigation bar [ 10 Points ]", () => {
        it("Logged user should see correct navigation [ 2.5 Points ]", async function () {
            // Login user
            const userData = mockData.users[0];
            const { post: loginPost } = await handle(endpoints.login);
            loginPost(userData);
            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();

            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });

            await emailElement.fill(userData.email);
            await passwordElement.fill(userData.password);

            await page.click('[type="submit"]');

            await page.waitForSelector('nav >> text= Mindful Tips', { timeout: interval });

            expect(await page.isVisible("nav >> text=Mindful Tips")).to.be.true;
            expect(await page.isVisible("nav >> text=Share Your Tip")).to.be.true;
            expect(await page.isVisible("nav >> text=Logout")).to.be.true;



            expect(await page.isVisible("nav >> text=Login")).to.be.false;
            expect(await page.isVisible("nav >> text=Register")).to.be.false;
        });

        it("Guest user should see correct navigation [ 2.5 Points ]", async function () {
            await page.goto(host);

            await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });

            expect(await page.isVisible("nav"), "Dashboard is not visible").to.be.true;
            expect(await page.isVisible("nav >> text=Share Your Tip"), "Create is visible").to.be.false;
            expect(await page.isVisible("nav >> text=Logout"), "Logout is visible").to.be.false;
            expect(await page.isVisible("nav >> text=Login"), "Login is not visible").to.be.true;
            expect(await page.isVisible("nav >> text=Register"), "Ragister is not visible").to.be.true;
        });

        it("Guest user navigation should work [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog);
            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector('#tips-dashboard', { timeout: interval });
            let loginBtn = await page.waitForSelector('nav >> text=Login', { timeout: interval });
            await loginBtn.click();


            await page.waitForSelector('#login', { timeout: interval });
            let registerBtn = await page.waitForSelector('nav >> text=Register', { timeout: interval });
            await registerBtn.click();

            await page.waitForSelector('#register', { timeout: interval });
            let logo = await page.waitForSelector('#logo', { timeout: interval });
            await logo.click();

            await page.waitForSelector('#home', { timeout: interval });
        });

        it("Logged in user navigation should work [ 2.5 Points ]", async function () {
            // Login user
            const userData = mockData.users[0];
            const { post: loginPost } = await handle(endpoints.login);
            loginPost(userData);
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog);

            await page.goto(host);

            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();

            await page.waitForSelector("form", { timeout: interval });

            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });

            await emailElement.fill(userData.email);
            await passwordElement.fill(userData.password);

            await page.click('[type="submit"]');

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector('#tips-dashboard', { timeout: interval });
            let createBtn = await page.waitForSelector('nav >> text=Share Your Tip', { timeout: interval });
            await createBtn.click();

            await page.waitForSelector('#create', { timeout: interval });
            let logo = await page.waitForSelector('#logo', { timeout: interval });
            await logo.click();

            await page.waitForSelector('#home', { timeout: interval });
        });
    });

    describe("Home Page [ 5 Points ]", function () {
        it("Show Home page text [ 2.5 Points ]", async function () {
            await page.goto(host);
            await page.waitForSelector('text=Welcome to MindNest - your safe haven for mental wellness and mindfulness. Discover expert tips, guided meditations, and a supportive community sharing insights to help you find calm, balance, and inner peace every day. Join us and nurture your mind with care.', { timeout: interval });
            expect(await page.isVisible("text=Welcome to MindNest - your safe haven for mental wellness and mindfulness. Discover expert tips, guided meditations, and a supportive community sharing insights to help you find calm, balance, and inner peace every day. Join us and nurture your mind with care.")).to.be.true;
        });

        it("Show home page image [ 2.5 Points ]", async function () {
            await page.goto(host);
            await page.waitForSelector('#home img', { timeout: interval });
            expect(await page.isVisible('#home img')).to.be.true;
        });
    });

    describe("Dashboard Page [ 15 Points ]", function () {
        it("Show Mindful Tips page - 'Mindful Tips' message [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get([]);
            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text= Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector('h3 >> text=Mindful Tips', { timeout: interval });
            expect(await page.isVisible("h3 >> text=Mindful Tips")).to.be.true;
        });

        it("Check Mindful Tips page with 0 Tips [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get([]);

            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector('text=No Mindful Tips Added Yet.', { timeout: interval });
            expect(await page.isVisible('text=No Mindful Tips Added Yet.')).to.be.true;

        });

        it("Check Tips have correct Images [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog);
            const data = mockData.catalog;

            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector(".tip img", { timeout: interval });
            const images = await page.$$eval(".tip img", (t) =>
                t.map((s) => s.src)
            );

            expect(images.length).to.equal(3);
            expect(images[0]).to.contains(`${encodeURI(data[0].imageUrl)}`);
            expect(images[1]).to.contains(`${encodeURI(data[1].imageUrl)}`);
            expect(images[2]).to.contains(`${encodeURI(data[2].imageUrl)}`);
        });

        it("Check Tips have correct Title [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog);
            const data = mockData.catalog;

            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector(".tip .title", { timeout: interval });
            const categories = await page.$$eval(".tip .title", (t) =>
                t.map((s) => s.textContent)
            );

            expect(categories.length).to.equal(3);
            expect(categories[0]).to.contains(`${data[0].title}`);
            expect(categories[1]).to.contains(`${data[1].title}`);
            expect(categories[2]).to.contains(`${data[2].title}`);
        });

        it("Check Tips have correct Type [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 2));
            const data = mockData.catalog.slice(0, 2);

            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector(".tip-info .type", { timeout: interval });
            const categories = await page.$$eval(".tip-info .type", (t) =>
                t.map((s) => s.textContent)
            );

            expect(categories.length).to.equal(2);
            expect(categories[0]).to.contains(`${data[0].type}`);
            expect(categories[1]).to.contains(`${data[1].type}`);
        });
        it("Check tIPS have correct Difficulty [ 2.5 Points ]", async function () {
            const { get } = await handle(endpoints.catalog);
            get(mockData.catalog.slice(0, 2));
            const data = mockData.catalog.slice(0, 2);

            await page.goto(host);

            let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
            await mindfulTipsBtn.click();

            await page.waitForSelector(".tip-info .difficulty", { timeout: interval });
            const categories = await page.$$eval(".tip-info .difficulty", (t) =>
                t.map((s) => s.textContent)
            );

            expect(categories.length).to.equal(2);
            expect(categories[0]).to.contains(`${data[0].difficulty}`);
            expect(categories[1]).to.contains(`${data[1].difficulty}`);
        });

    });

    describe("CRUD [ 50 Points ]", () => {
        describe('Create [ 12.5 Points ]', function () {
            it("Create does NOT work with empty fields [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post: loginPost } = await handle(endpoints.login);
                loginPost(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                await page.click('[type="submit"]');

                const { post } = await handle(endpoints.create);
                const isCalled = post().isHandled;

                let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
                await addTipBtn.click();

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await submitBtn.click();

                await page.waitForTimeout(interval);
                expect(isCalled()).to.equal(false, 'Create API was called when form inputs were empty');
            });

            it("Create makes correct API call [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post: loginPost } = await handle(endpoints.login);
                loginPost(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const data = mockData.catalog[0];
                const { post } = await handle(endpoints.create);
                const { onRequest } = post(data);

                let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
                await addTipBtn.click();

                let titleElement = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageElement = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeElement = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultyElement = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionElement = await page.waitForSelector('[name="description"]', { timeout: interval });
                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await titleElement.fill(data.title);
                await imageElement.fill(data.imageUrl);
                await typeElement.fill(data.type);
                await difficultyElement.selectOption(data.difficulty);
                await descriptionElement.fill(data.description);

                const [request] = await Promise.all([
                    onRequest(),
                    submitBtn.click(),
                ]);
            });

            it("Create sends correct data [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post: loginPost } = await handle(endpoints.login);
                loginPost(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const data = mockData.catalog[0];
                const { post } = await handle(endpoints.create);
                const { onRequest } = post(data);

                let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
                await addTipBtn.click();



                let titleElement = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageElement = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeElement = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultyElement = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionElement = await page.waitForSelector('[name="description"]', { timeout: interval });
                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await titleElement.fill(data.title);
                await imageElement.fill(data.imageUrl);
                await typeElement.fill(data.type);
                await difficultyElement.selectOption(data.difficulty);
                await descriptionElement.fill(data.description);

                const [request] = await Promise.all([
                    onRequest(),
                    submitBtn.click(),
                ]);

                const postData = JSON.parse(request.postData());

                expect(postData.title).to.equal(data.title);
                expect(postData.imageUrl).to.equal(data.imageUrl);
                expect(postData.type).to.equal(data.type);
                expect(postData.difficulty).to.equal(data.difficulty);
                expect(postData.description).to.equal(data.description);


            });

            it("Create includes correct headers [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post: loginPost } = await handle(endpoints.login);
                loginPost(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const data = mockData.catalog[0];
                const { post } = await handle(endpoints.create);
                const { onRequest } = post(data);

                let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
                await addTipBtn.click();

                let titleElement = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageElement = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeElement = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultyElement = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionElement = await page.waitForSelector('[name="description"]', { timeout: interval });
                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await titleElement.fill(data.title);
                await imageElement.fill(data.imageUrl);
                await typeElement.fill(data.type);
                await difficultyElement.selectOption(data.difficulty);
                await descriptionElement.fill(data.description);

                const [request] = await Promise.all([
                    onRequest(),
                    submitBtn.click(),
                ]);

                const token = request.headers()["x-authorization"];
                expect(token).to.equal(userData.accessToken, 'Request did not send correct authorization header');
            });

            it("Create redirects to dashboard on success [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post: loginPost } = await handle(endpoints.login);
                loginPost(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);
                const data = mockData.catalog[0];
                const { post } = await handle(endpoints.create);
                const { onResponse } = post(data);

                let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
                await addTipBtn.click();

                let titleElement = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageElement = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeElement = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultyElement = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionElement = await page.waitForSelector('[name="description"]', { timeout: interval });
                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await titleElement.fill(data.title);
                await imageElement.fill(data.imageUrl);
                await typeElement.fill(data.type);
                await difficultyElement.selectOption(data.difficulty);
                await descriptionElement.fill(data.description);

                await Promise.all([
                    onResponse(),
                    submitBtn.click(),
                ]);

                await page.waitForSelector('#tips-dashboard', { timeout: interval });
            });
        })

        describe('Details [ 10 Points ]', function () {
            it("Details calls the correct API [ 2.5 Points ]", async function () {
                await page.goto(host);

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[1];
                const { get } = await handle(endpoints.details(data._id));
                let { onResponse, isHandled } = get(data);


                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });

                await Promise.all([
                    onResponse(),
                    moreInfoButton.click()
                ]);

                expect(isHandled()).to.equal(true, 'Details API did not receive a correct call');
            });

            it("Details with guest calls shows correct info [ 2.5 Points ]", async function () {
                await page.goto(host);

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[1];
                const { get } = await handle(endpoints.details(data._id));
                let { isHandled } = get(data);


                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let imageElement = await page.waitForSelector('#details-img', { timeout: interval });
                let titleElement = await page.waitForSelector('#details-title', { timeout: interval });
                let typeElement = await page.waitForSelector('.details-type', { timeout: interval });
                let difficultyElement = await page.waitForSelector('.details-difficulty', { timeout: interval });
                let descriptionElement = await page.waitForSelector('#tip-description', { timeout: interval });



                let imageSrc = await imageElement.getAttribute('src');
                let title = await titleElement.textContent();
                let type = await typeElement.textContent();
                let difficulty = await difficultyElement.textContent();
                let description = await descriptionElement.textContent();


                expect(imageSrc).to.contains(data.imageUrl);
                expect(title).to.contains(data.title);
                expect(type).to.contains(data.type);
                expect(difficulty).to.contains(data.difficulty);
                expect(description).to.contains(data.description);
                expect(await page.isVisible('#action-buttons >> text="Delete"')).to.equal(false, 'Delete button was visible for non owner');
                expect(await page.isVisible('#action-buttons >> text="Edit"')).to.equal(false, 'Edit button was visible for non-owner');

                expect(isHandled()).to.equal(true, 'Details API was not called');
            });

            it("Details with logged in user shows correct info [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[0];
                const { get } = await handle(endpoints.details(data._id));
                let { isHandled } = get(data);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let imageElement = await page.waitForSelector('#details-img', { timeout: interval });
                let titleElement = await page.waitForSelector('#details-title', { timeout: interval });
                let typeElement = await page.waitForSelector('.details-type', { timeout: interval });
                let difficultyElement = await page.waitForSelector('.details-difficulty', { timeout: interval });
                let descriptionElement = await page.waitForSelector('#tip-description', { timeout: interval });



                let imageSrc = await imageElement.getAttribute('src');
                let title = await titleElement.textContent();
                let type = await typeElement.textContent();
                let difficulty = await difficultyElement.textContent();
                let description = await descriptionElement.textContent();


                expect(imageSrc).to.contains(data.imageUrl);
                expect(title).to.contains(data.title);
                expect(type).to.contains(data.type);
                expect(difficulty).to.contains(data.difficulty);
                expect(description).to.contains(data.description);
                expect(await page.isVisible('#action-buttons >> text="Delete"')).to.equal(false, 'Delete button was visible for non owner');
                expect(await page.isVisible('#action-buttons >> text="Edit"')).to.equal(false, 'Edit button was visible for non-owner');

                expect(isHandled()).to.equal(true, 'Details API was not called');
            });

            it("Details with owner shows correct info [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[1];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[0];
                const { get } = await handle(endpoints.details(data._id));
                let { isHandled } = get(data);


                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let imageElement = await page.waitForSelector('#details-img', { timeout: interval });
                let titleElement = await page.waitForSelector('#details-title', { timeout: interval });
                let typeElement = await page.waitForSelector('.details-type', { timeout: interval });
                let difficultyElement = await page.waitForSelector('.details-difficulty', { timeout: interval });
                let descriptionElement = await page.waitForSelector('#tip-description', { timeout: interval });



                let imageSrc = await imageElement.getAttribute('src');
                let title = await titleElement.textContent();
                let type = await typeElement.textContent();
                let difficulty = await difficultyElement.textContent();
                let description = await descriptionElement.textContent();


                expect(imageSrc).to.contains(data.imageUrl);
                expect(title).to.contains(data.title);
                expect(type).to.contains(data.type);
                expect(difficulty).to.contains(data.difficulty);
                expect(description).to.contains(data.description);
                expect(await page.isVisible('#action-buttons >> text="Delete"')).to.equal(true, 'Delete button was NOT visible for owner');
                expect(await page.isVisible('#action-buttons >> text="Edit"')).to.equal(true, 'Edit button was NOT visible for owner');

                expect(isHandled()).to.equal(true, 'Details API was not called');
            });
        })

        describe('Edit [ 17.5 Points ]', function () {
            it("Edit calls correct API to populate info [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[1];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[1];
                const { get } = await handle(endpoints.details(data._id));
                let { onResponse, isHandled } = get(data);


                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });

                await Promise.all([
                    onResponse(),
                    editButton.click()
                ]);

                expect(isHandled()).to.equal(true, 'Request was not sent to Details API to get Edit information');
            });

            it("Edit should populate form with correct data [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[1];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[1];
                const { get } = await handle(endpoints.details(data._id));
                get(data);

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();

                await page.waitForSelector('.form .edit-form input', { timeout: interval });
                await page.waitForSelector('.edit-form textarea', { timeout: interval });

                const inputs = await page.$$eval(".form .edit-form input", (t) => t.map((i) => i.value));
                const textareas = await page.$$eval(".edit-form textarea", (t) => t.map((i) => i.value));
                const selectedDifficulty = await page.$eval('select[name="difficulty"]', (select) => select.value);

                expect(inputs[0]).to.contains(data.title);
                expect(inputs[1]).to.contains(data.imageUrl);
                expect(inputs[2]).to.contains(data.type);

                expect(selectedDifficulty).to.equal(data.difficulty);

                expect(textareas[0]).to.contains(data.description);
            });

            it("Edit does NOT work with empty fields [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[2];
                const { get, put } = await handle(endpoints.details(data._id));
                get(data);
                const { isHandled } = put();

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();


                let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });


                await titleInput.fill('');
                await imageInput.fill('');
                await typeInput.fill('');

                await difficultySelect.selectOption('');

                await descriptionInput.fill('');

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await submitBtn.click();

                await page.waitForTimeout(interval);
                expect(isHandled()).to.equal(false, 'Edit API was called when form inputs were empty');
            });


            it("Edit sends information to the right API [ 2.5 Points ]", async function () {
                // Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[2];
                const modifiedData = Object.assign({}, data);
                modifiedData.title = 'Model Test';
                modifiedData.imageUrl = 'Image Test';
                modifiedData.type = '1';
                modifiedData.difficulty = 'Easy';  
                modifiedData.description = 'About Test';

                const { get, put } = await handle(endpoints.details(data._id));
                get(data);
                const { isHandled, onResponse } = put(modifiedData);

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();

                let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });

                await titleInput.fill(modifiedData.title);
                await imageInput.fill(modifiedData.imageUrl);
                await typeInput.fill(modifiedData.type);
                await difficultySelect.selectOption(modifiedData.difficulty);
                await descriptionInput.fill(modifiedData.description);

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await Promise.all([
                    onResponse(),
                    submitBtn.click(),
                ]);

                expect(isHandled()).to.equal(true, 'The Edit API was not called');
            });



            it("Edit sends correct headers [ 2.5 Points ]", async function () {
                // Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[2];
                const modifiedData = Object.assign({}, data);
                modifiedData.title = 'Model Test';
                modifiedData.imageUrl = 'Image Test';
                modifiedData.type = '1';
                modifiedData.difficulty = 'Easy';
                modifiedData.description = 'About Test';

                const { get, put } = await handle(endpoints.details(data._id));
                get(data);
                const { onRequest } = put(modifiedData);

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();

                let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });

                await titleInput.fill(modifiedData.title);
                await imageInput.fill(modifiedData.imageUrl);
                await typeInput.fill(modifiedData.type);
                await difficultySelect.selectOption(modifiedData.difficulty);
                await descriptionInput.fill(modifiedData.description);

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                let [request] = await Promise.all([
                    onRequest(),
                    submitBtn.click(),
                ]);

                const token = request.headers()["x-authorization"];
                expect(token).to.equal(userData.accessToken, 'Request did not send correct authorization header');
            });



            it("Edit sends correct information [ 2.5 Points ]", async function () {
                // Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[2];
                const modifiedData = Object.assign({}, data);
                modifiedData.title = 'Model Test';
                modifiedData.imageUrl = 'Image Test';
                modifiedData.type = '1';
                modifiedData.difficulty = 'Easy';
                modifiedData.description = 'About Test';

                const { get, put } = await handle(endpoints.details(data._id));
                get(data);
                const { onRequest } = put(modifiedData);

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();

                let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });

                await titleInput.fill(modifiedData.title);
                await imageInput.fill(modifiedData.imageUrl);
                await typeInput.fill(modifiedData.type);
                await difficultySelect.selectOption(modifiedData.difficulty);
                await descriptionInput.fill(modifiedData.description);

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                const [request] = await Promise.all([
                    onRequest(),
                    submitBtn.click(),
                ]);

                const postData = JSON.parse(request.postData());

                expect(postData.title).to.contains(modifiedData.title);
                expect(postData.imageUrl).to.contains(modifiedData.imageUrl);
                expect(postData.type).to.contains(modifiedData.type);
                expect(postData.difficulty).to.contains(modifiedData.difficulty);
                expect(postData.description).to.contains(modifiedData.description);
            });



            it("Edit redirects to Details on success [ 2.5 Points ]", async function () {
                // Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);

                const data = mockData.catalog[2];
                const modifiedData = Object.assign({}, data);
                modifiedData.title = 'Model Test';
                modifiedData.imageUrl = 'Image Test';
                modifiedData.type = '1';
                modifiedData.difficulty = 'Easy';
                modifiedData.description = 'About Test';

                const { get, put } = await handle(endpoints.details(data._id));
                get(data);
                const { onResponse } = put(modifiedData);

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
                await editButton.click();

                let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
                let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
                let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
                let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
                let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });

                await titleInput.fill(modifiedData.title);
                await imageInput.fill(modifiedData.imageUrl);
                await typeInput.fill(modifiedData.type);
                await difficultySelect.selectOption(modifiedData.difficulty);
                await descriptionInput.fill(modifiedData.description);

                let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

                await Promise.all([
                    onResponse(),
                    submitBtn.click(),
                ]);

                await page.waitForSelector('#details', { timeout: interval });
            });

        })

        describe('Delete [ 10 Points ]', function () {
            it("Delete makes correct API call [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();
                const data = mockData.catalog[2];

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);
                const { get, del } = await handle(endpoints.details(data._id));
                get(data);
                const { onRequest, onResponse, isHandled } = del({ "_deletedOn": 1688586307461 });


                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let deleteButton = await page.waitForSelector('#action-buttons >> text="Delete"', { timeout: interval });

                page.on('dialog', (dialog) => dialog.accept());

                let [request] = await Promise.all([onRequest(), onResponse(), deleteButton.click()]);

                const token = request.headers()["x-authorization"];
                expect(token).to.equal(userData.accessToken, 'Request did not send correct authorization header');
                expect(isHandled()).to.be.true;
            });

            it("Delete shows a confirm dialog [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();
                const data = mockData.catalog[2];

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);
                const { get, del } = await handle(endpoints.details(data._id));
                get(data);
                const { onResponse, isHandled } = del({ "_deletedOn": 1688586307461 });


                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let deleteButton = await page.waitForSelector('#action-buttons >> text="Delete"', { timeout: interval });

                let alertPromise = new Promise(resolve => {
                    page.on('dialog', (dialog) => {
                        dialog.accept();
                        resolve(dialog.type());
                    });
                });

                let result = await Promise.all([alertPromise, onResponse(), deleteButton.click()]);
                expect(result[0]).to.equal('confirm');
            });

            it("Delete redirects to Dashboard on confirm accept [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();
                const data = mockData.catalog[2];

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);
                const { get, del } = await handle(endpoints.details(data._id));
                get(data);
                const { onResponse, isHandled } = del({ "_deletedOn": 1688586307461 });

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let deleteButton = await page.waitForSelector('#action-buttons >> text="Delete"', { timeout: interval });

                let alertPromise = new Promise(resolve => {
                    page.on('dialog', (dialog) => {
                        dialog.accept();
                        resolve(dialog.type());
                    });
                });

                await Promise.all([alertPromise, onResponse(), deleteButton.click()]);

                await page.waitForSelector('#tips-dashboard', { timeout: interval });
            });

            it("Delete does not delete on confirm reject [ 2.5 Points ]", async function () {
                //Login
                const userData = mockData.users[0];
                const { post } = await handle(endpoints.login);
                post(userData);
                await page.goto(host);
                let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
                await loginBtn.click();
                await page.waitForSelector("form", { timeout: interval });
                let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
                let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
                await emailElement.fill(userData.email);
                await passwordElement.fill(userData.password);
                let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
                await loginSubmitBtn.click();
                const data = mockData.catalog[2];

                const { get: catalogGet } = await handle(endpoints.catalog);
                catalogGet(mockData.catalog);
                const { get, del } = await handle(endpoints.details(data._id));
                get(data);
                const { isHandled } = del({ "_deletedOn": 1688586307461 });

                const { get: own } = await handle(endpoints.own(data._id, userData._id));
                own(1);

                let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
                await mindfulTipsBtn.click();

                let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
                await moreInfoButton.click();

                let deleteButton = await page.waitForSelector('#action-buttons >> text="Delete"', { timeout: interval });

                let alertPromise = new Promise(resolve => {
                    page.on('dialog', (dialog) => {
                        dialog.dismiss();
                        resolve(dialog.type());
                    });
                });

                await Promise.all([alertPromise, deleteButton.click()]);
                expect(isHandled()).to.equal(false, 'Delete API was called when the confirm dialog not accepted');

                //Check if we're still on Details page
                await page.waitForSelector('#details', { timeout: interval });
            });
        })
    });
    describe('BONUS: Notifications [ 10 Points ]', () => {
        it('Notification with invalid data [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.login;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click(' text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;

        });

        it('Login notification with invalid data [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.login;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click(' text="Login"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;

        });

        it('Register notification with invalid data [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.register;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click('text="Register"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });

        it('Notification with invalid data 2 [ 2.5 Points ]', async () => {
            const endpoint = '**' + endpoints.register;
            let called = false;
            page.route(endpoint, route => called = true);

            await page.goto(host);
            await page.click('text="Register"');

            await page.waitForTimeout(300);
            await page.waitForSelector('form');

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });

        it('Create notification with invalid data [ 2.5 Points ]', async () => {
            //Login
            const userData = mockData.users[0];
            const { post: loginPost } = await handle(endpoints.login);
            loginPost(userData);
            await page.goto(host);
            let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
            await loginBtn.click();
            await page.waitForSelector("form", { timeout: interval });
            let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
            let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
            await emailElement.fill(userData.email);
            await passwordElement.fill(userData.password);
            let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
            await loginSubmitBtn.click();

            const data = mockData.catalog[0];
            const { post } = await handle(endpoints.create);
            const { onRequest } = post(data);

            let addTipBtn = await page.waitForSelector('text=Share Your Tip', { timeout: interval });
            await addTipBtn.click();

            await page.waitForTimeout(300);

            const preClickNotification = await page.isVisible('#errorBox');
            expect(preClickNotification).to.be.false;

            await page.click('[type="submit"]');
            await page.waitForTimeout(300);

            const notification = await page.isVisible('#errorBox');
            expect(notification).to.be.true;
        });

      it('Edit notification with invalid data [ 2.5 Points ]', async () => {
    // Login
    const userData = mockData.users[0];
    const { post } = await handle(endpoints.login);
    post(userData);
    await page.goto(host);
    let loginBtn = await page.waitForSelector('text=Login', { timeout: interval });
    await loginBtn.click();
    await page.waitForSelector("form", { timeout: interval });
    let emailElement = await page.waitForSelector('[name="email"]', { timeout: interval });
    let passwordElement = await page.waitForSelector('[name="password"]', { timeout: interval });
    await emailElement.fill(userData.email);
    await passwordElement.fill(userData.password);
    let loginSubmitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });
    await loginSubmitBtn.click();

    const { get: catalogGet } = await handle(endpoints.catalog);
    catalogGet(mockData.catalog);

    const data = mockData.catalog[2];
    const modifiedData = Object.assign({}, data);
    modifiedData.title = 'Model Test';
    modifiedData.imageUrl = 'Image Test';
    modifiedData.type = '1';
    modifiedData.difficulty = 'Easy';
    modifiedData.description = ''; // празно описание - невалидно

    const { get, put } = await handle(endpoints.details(data._id));
    get(data);
    const { isHandled, onResponse } = put(modifiedData);

    const { get: own } = await handle(endpoints.own(data._id, userData._id));
    own(1);

    let mindfulTipsBtn = await page.waitForSelector('nav >> text=Mindful Tips', { timeout: interval });
    await mindfulTipsBtn.click();

    let moreInfoButton = await page.waitForSelector(`.tip:has-text("${data.title}") >> .details-btn`, { timeout: interval });
    await moreInfoButton.click();

    let editButton = await page.waitForSelector('#action-buttons >> text="Edit"', { timeout: interval });
    await editButton.click();

    let titleInput = await page.waitForSelector('[name="title"]', { timeout: interval });
    let imageInput = await page.waitForSelector('[name="imageUrl"]', { timeout: interval });
    let typeInput = await page.waitForSelector('[name="type"]', { timeout: interval });
    let difficultySelect = await page.waitForSelector('[name="difficulty"]', { timeout: interval });
    let descriptionInput = await page.waitForSelector('[name="description"]', { timeout: interval });

    await titleInput.fill(modifiedData.title);
    await imageInput.fill(modifiedData.imageUrl);
    await typeInput.fill(modifiedData.type);
    await difficultySelect.selectOption(modifiedData.difficulty);
    await descriptionInput.fill(modifiedData.description);

    let submitBtn = await page.waitForSelector('[type="submit"]', { timeout: interval });

    await Promise.all([
        submitBtn.click(),
    ]);
    await page.waitForTimeout(300);

    const notification = await page.isVisible('#errorBox');
    expect(notification).to.be.true;
});

    });
});

async function setupContext(context) {
    // Block external calls
    await context.route(
        (url) => url.href.slice(0, host.length) != host,
        (route) => {
            if (DEBUG) {
                console.log("Preventing external call to " + route.request().url());
            }
            route.abort();
        }
    );
}

function handle(match, handlers) {
    return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
    return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
    const methodHandlers = {};
    const result = {
        get: (returns, options) => request("GET", returns, options),
        post: (returns, options) => request("POST", returns, options),
        put: (returns, options) => request("PUT", returns, options),
        patch: (returns, options) => request("PATCH", returns, options),
        del: (returns, options) => request("DELETE", returns, options),
        delete: (returns, options) => request("DELETE", returns, options),
    };

    const context = this;

    await context.route(urlPredicate, (route, request) => {
        if (DEBUG) {
            console.log(">>>", request.method(), request.url());
        }

        const handler = methodHandlers[request.method().toLowerCase()];
        if (handler == undefined) {
            route.continue();
        } else {
            handler(route, request);
        }
    });

    if (handlers) {
        for (let method in handlers) {
            if (typeof handlers[method] == "function") {
                handlers[method](result[method]);
            } else {
                result[method](handlers[method]);
            }
        }
    }

    return result;

    function request(method, returns, options) {
        let handled = false;

        methodHandlers[method.toLowerCase()] = (route, request) => {
            handled = true;
            route.fulfill(respond(returns, options));
        };

        return {
            onRequest: () => context.waitForRequest(urlPredicate),
            onResponse: () => context.waitForResponse(urlPredicate),
            isHandled: () => handled,
        };
    }

    function urlPredicate(current) {
        if (current instanceof URL) {
            return current.href.toLowerCase().endsWith(match.toLowerCase());
        } else {
            return current.url().toLowerCase().endsWith(match.toLowerCase());
        }
    }
}

function respond(data, options = {}) {
    options = Object.assign(
        {
            json: true,
            status: 200,
        },
        options
    );

    const headers = {
        "Access-Control-Allow-Origin": "*",
    };
    if (options.json) {
        headers["Content-Type"] = "application/json";
        data = JSON.stringify(data);
    }

    return {
        status: options.status,
        headers,
        body: data,
    };
}