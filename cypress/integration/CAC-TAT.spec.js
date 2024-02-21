/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        
        cy.visit('./src/index.html')

      })

    it('verifica o título da aplicação', function() {
    
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#open-text-area').type('Excelente Curso!skjadhfashdfkjhadksfjlha', {delay:0}).should('have.value', 'Excelente Curso!skjadhfashdfkjhadksfjlha')
        cy.contains('.button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga#mail.com').should('have.value', 'fraga#mail.com')
        cy.get('#open-text-area').type('Excelente Curso!skjadhfashdfkjhadksfjlha', {delay:0}).should('have.value', 'Excelente Curso!skjadhfashdfkjhadksfjlha')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')

    })

    it('campo de telefone fica vazio quando um valor não-numérico for digitado', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#phone').type('fraga@mail.com').should('have.text', '')
        cy.get('#open-text-area').type('Excelente Curso!skjadhfashdfkjhadksfjlha', {delay:0}).should('have.value', 'Excelente Curso!skjadhfashdfkjhadksfjlha')
        cy.contains('.button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')
        
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Excelente Curso!skjadhfashdfkjhadksfjlha', {delay:0}).should('have.value', 'Excelente Curso!skjadhfashdfkjhadksfjlha')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#phone').type('31313131').should('have.value', '31313131')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      
        cy.contains('.button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
      
        cy.fillMandatoryFieldsAndSubmit()
              
    })


  })