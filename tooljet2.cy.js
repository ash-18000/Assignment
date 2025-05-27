describe("App creation",()=>{

    beforeEach(()=>{
        cy.visit("https://v3-lts-eetestsystem.tooljet.com/qa-automation")
        cy.get("input[name='email']").type('test1@tooljet.com')
        cy.get("input[name='password']").type('')
        cy.get("button[type='submit']").click()
        
    })

    //Create an Application
    it("Create Application",()=>{
        cy.get('[data-cy="create-new-app-button"]').click()
        const dynamicAppName = `App_${Date.now()}`;

         cy.get('[data-cy="app-name-input"]').clear().type(dynamicAppName);

         // Optionally store it for later use
        cy.wrap(dynamicAppName).as('appName');
        cy.get("button[type='submit']").click()

        //Validating API response
         cy.request('GET','https://cetestsystem.tooljet.com/assets/libs/pyodide-0.23.2/pyodide.js').then((response)=>{
            expect(response.status).eq(200)
        })
    })

    //Creating APP from template
    it("Create app from template",()=>{
        cy.get('[data-cy="import-dropdown-menu"]').click()
        cy.get('[data-cy="choose-from-template-button"]').click()
        cy.get('[data-cy="ai-powered-code-explainer-list-item"]').click()
        cy.get('[data-cy="create-application-from-template-button"]').click()
        // Generate a unique app name using timestamp
        const dynamicAppName = `App_${Date.now()}`;

         cy.get('[data-cy="app-name-input"]').clear().type(dynamicAppName);

         // Optionally store it for later use
        cy.wrap(dynamicAppName).as('appName');

        cy.get('[data-cy="app-name-input"]').type('Example')
        cy.get('[data-cy="+-create-app"]').click()

       //validating API Response
       cy.request('GET','https://v3-lts-eetestsystem.tooljet.com/qa-automation/apps/f7ba0c19-8283-481f-a3c5-0b9feada7d1b').then((resp)=>{
        expect(resp.status).to.eq(200)
       })

       })

      //Creating app for import template
    it("Create app for import template",()=>{
        cy.get('[data-cy="import-dropdown-menu"]').click()
        cy.get('[data-cy="import-option-label"]').click(); // simulate open
        cy.get('input[type="file"]').attachFile('samplefile.json');

        //validating the API Response
        cy.request('GET','https://v3-lts-eetestsystem.tooljet.com/main.js?844efe9e9235ef454e9c').then((resp)=>{
        expect(resp.status).to.eq(200)    
        })


        const appName = `TestApp_${Date.now()}`;
        cy.get('[data-cy="app-name-input"]').clear().type(appName);

        cy.get('[data-cy="import-app"]').click()



})
})