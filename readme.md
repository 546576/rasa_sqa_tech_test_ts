Installation instructions:

1. Install VS Code
2. Install Node.JS 
3. Install Playwright Extension via VSCode extensions tab
4. Install Playwright (https://playwright.dev/docs/getting-started-vscode)
5. Install Faker for dummy data (`npm install --save-dev @faker-js/faker`)

=====================Part 1 Scenarios======================
1. Unique signup and login (Automated)
2. Purchasing a product (Partly automated - bugged)
3. Credit card + Location validation (Not automated - bugged)
4. User can log in, then out (Automated)
5. Incorrect username and password validation (Automated)
6. Duplicate user credentials validation (Automated) 
7. Cart CRUD validation (Not automated - bugged)
8. Slide modal operates as expected (Manual)
9. Product page filters correctly apply (Manual)

=====================Part 2 Scenarios======================
1. Able to get broad details of all continents (updated existing case)
2. Able to get all details of a specific country 
3. Basic queries return responses 
4. Able to get all details of a specific language 

======================Future Improvements===================
Part 1: UI Demoblaze Tests
1. Debugging [Bugged] scenario (playwright/chromium browser error? Manual testing proves successful)
2. Adding validation onto credit card/phone number/location (validating data format is correct)
3. 'Contact Us' message received backend validation
4. Cart CRUD testing 
5. Iterative product purchase case (iterating through all available products and adding to cart to ensure no broken purchasing links)

Part 2: Countries API Tests
1. Security test; potentially not necessary for publically accessible API but if there is sensitive data, this is a must
2. Load testing
3. Data verification (depending on the data volatility/who owns this data)