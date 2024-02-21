// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', submit =>{
    
    cy.visit('./src/index.html')

    cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
    cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
    cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
    cy.get('#open-text-area').type('Excelente Curso!skjadhfashdfkjhadksfjlha', {delay:0}).should('have.value', 'Excelente Curso!skjadhfashdfkjhadksfjlha')
    cy.contains('.button', 'Enviar').click()
    cy.get('.success > strong').should('be.visible')
} )