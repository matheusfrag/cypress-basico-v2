Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
    cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
    cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
    cy.get('#open-text-area').type('Excelente Curso!').should('have.value', 'Excelente Curso!')
    cy.contains('.button', 'Enviar').click()

} )