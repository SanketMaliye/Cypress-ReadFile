

describe('Read Txt File', () => {
    it('Txt', () => {
        cy.verifyDownload('abc.txt');
        cy.readFile('cypress/downloads/abc.txt')
            .should('contains', 'Hi Sanket')

    })
})