describe('Teste de login no duolingo', function () {
    const email = 'williandesouza3@gmail.com', password = 35712566
    beforeEach(function () {
        cy.visit('https://www.duolingo.com/?isLoggingIn=true')
    })
    it ('Verifica se o título da página é "Duolingo - The world\'s best way to learn a language"', function () {
        cy.title().should('be.equal', 'Duolingo - The world\'s best way to learn a language')
    })
    it('Troca idioma de página para português', function () {
        cy.get('._1gEmM > span._9lHjd').click()
        cy.get('._2YXlI').click()
    })
})