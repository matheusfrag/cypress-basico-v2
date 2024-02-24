/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        
        cy.visit('./src/index.html')

      })


    it('verifica o título da aplicação', function() {
    
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#open-text-area').type(longText, {delay:0}).should('have.value', longText)
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga#mail.com').should('have.value', 'fraga#mail.com')
        cy.get('#open-text-area').type('Excelente Curso!').should('have.value', 'Excelente Curso!')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo de telefone fica vazio quando um valor não-numérico for digitado', function() {
    
        
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.text', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Excelente Curso!').should('have.value', 'Excelente Curso!')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    
        cy.get('#firstName')
          .type('Matheus')
          .should('have.value', 'Matheus')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Fraga').should('have.value', 'Fraga')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('fraga@mail.com')
          .should('have.value', 'fraga@mail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('31313131')
          .should('have.value', '31313131')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')    
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('', () => {
      cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')  //Pega todos os radio buttons
        .should('have.length', 3) //Confere se tem 3 radio buttons identificados no caso acima
        .each(function($radio) { //lista todos os radio buttons e funciona como um loop passando por todos os casos
          cy.wrap($radio).check() //wrap empacota todos os radio buttons e checka eles
          cy.wrap($radio).should('be.checked') //wrap empacota todos os radio buttons e confere se foram marcados
        })
    });

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('exampleFile')
      cy.get('#file-upload')
        .selectFile('@exampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

  })