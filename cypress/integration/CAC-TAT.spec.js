/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000 

    beforeEach(function() {
        
        cy.visit('./src/index.html')
        
      })


    it('verifica o título da aplicação', function() {
    
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        
        cy.clock()
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#open-text-area').type(longText, {delay:0}).should('have.value', longText)
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.clock()
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga#mail.com').should('have.value', 'fraga#mail.com')
        cy.get('#open-text-area').type('Excelente Curso!').should('have.value', 'Excelente Curso!')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('campo de telefone fica vazio quando um valor não-numérico for digitado', function() {
    
        
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.text', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.clock()
        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
        cy.get('#lastName').type('Fraga').should('have.value', 'Fraga')
        cy.get('#email').type('fraga@mail.com').should('have.value', 'fraga@mail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Excelente Curso!').should('have.value', 'Excelente Curso!')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        
        cy.clock()
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')    
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
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

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function()  {
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function()  {
      cy.get('#privacy a')
        . invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    });

    it('testa a página da política de privacidade de forma independente', function()  {
      cy.visit('./src/privacy.html')
      cy.get('#title')
        .should('have.text', 'CAC TAT - Política de privacidade')
    });

    //Repetindo o teste 5 vezes com Lodash
    Cypress._.times(5, function()  {
    it('campo de telefone fica vazio quando um valor não-numérico for digitado', function() {
    
        
      cy.get('#phone')
        .type('abcdefghij')
        .should('have.text', '')
    })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })


    it('preenche a area de texto usando o comando invoke', function(){
      const longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)

    })

    it('faz uma requisição HTTP', function(){

      cy.request({
          method: 'GET', 
          url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
      })
      .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.statusText).to.equal('OK')
          expect(response.body).to.include('CAC TAT')
      })

  })

    it('faz uma requisição HTTP - Correção', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response){
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
          })
    })

    it.only('Encontre o GATO', function(){

      cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', '🐈')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
    })
  })