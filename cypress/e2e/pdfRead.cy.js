describe('PDF Text Assertion Test', () => {
  it('pdf Assertions based on page numbers and text content', () => {
    //Assertion for presence of pdf
    cy.verifyDownload('abc.pdf');

    const pdfUrl = 'cypress/downloads/vat.pdf';

    cy.task('loadAndParsePDF', pdfUrl).then(({ numPages, textContent }) => {
      cy.log(`Number of pages: ${numPages}`);

      // Perform text assertions
      expect(textContent).to.include('VAT Invoice'); // Replace with your text
    });
  });
});