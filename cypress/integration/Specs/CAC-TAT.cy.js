// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.clock()

        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)


        cy.get('.success').should('not.be.visible')
    })

  it('Envia formulário com sucesso usando comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
  })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()

        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('abcdefjg').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o campo telefone não preenchido', function () {
        cy.clock()
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Valida envio de formulário quando telefone obrigatório', function () {
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('11960846066')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Willian')
            .should('have.value', 'Willian')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('de Souza')
            .should('have.value', 'de Souza')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('williandesouza3@gmail.com')
            .should('have.value', 'williandesouza3@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste teste teste')
            .should('have.value', 'teste teste teste')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11960846066')
            .should('have.value', '11960846066')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro sem preencher os campo obrigatórios', function () {
        cy.clock()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Envia formulário com sucesso usando comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('Seleciona um produto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        cy.get('#product').select('Blog').should('have.value', 'blog')
        cy.get('#product').select('Cursos').should('have.value', 'cursos')
        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto pelo seu indice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
        cy.get('#product').select(2).should('have.value', 'cursos')
        cy.get('#product').select(3).should('have.value', 'mentoria')
        cy.get('#product').select(4).should('have.value', 'youtube')
    })
    it('Marcando inputs do tipo radio', function () {
        cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })
    it('Verificadores', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('Marcando e desmarcando checkbox', function () {
        cy.get('input[type="checkbox"][value="email"]').check()
        cy.get('input[type="checkbox"][value="email"]').should('be.checked')
        cy.get('input[type="checkbox"][value="email"]').uncheck()
    })
    //Executa o teste por um número determinado de vezes
    Cypress._.times(10, function () {
        it('Marca ambos os checkboxes depois desmarca o ultimo', function () {
            cy.get('input[type="checkbox"]')
                .check()
                .last()
                .uncheck()
                .should('not.be.checked')
        })
    })
    it('Upload de arquivo', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Seleciona um arquivo a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Seleciona uma nova aba sem necessidade de um click', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('Acessa a página de politica de privacidade removendo o comando target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    })
    it('Exibe e esconde menssagem de sucesso e erro usando .invoke', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').invoke('show').should('be.visible')
        cy.get('.success').invoke('hide').should('not.be.visible')
        cy.get('.error').invoke('show').should('be.visible')
        cy.get('.error').invoke('hide').should('not.be.visible')
    })
    it('Exibe e esconde menssagem de sucesso e erro usando .invoke2', function () {
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
    it('Preenche a área de texto usando .invoke3', function () {
        const longText = Cypress._.repeat('123456789', 100)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it('Faz uma requisição HTTP', function () {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.eq(200)
                expect(statusText).to.eq('OK')
                expect(body).to.include('CAC TAT')
            })
    })
    it.only('Procura o gatinho perdido no HTML', function () {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#title')
            .invoke('text', 'Eu amo ^^ gatos e cachorros')
    })
}) 