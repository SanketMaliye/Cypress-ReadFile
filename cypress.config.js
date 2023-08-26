const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const { verifyDownloadTasks } = require('cy-verify-downloads');
const pdfjsLib = require('pdfjs-dist');

// Define function to load PDF, get number of pages and extract text content
async function loadAndExtractText(pdfUrl) {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  const numPages = pdf.numPages;
  const textContent = [];
  for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const pageText = await page.getTextContent();
    const pageTextContent = pageText.items.map(item => item.str).join(' ');
    textContent.push(pageTextContent);
  }
  return { numPages, textContent: textContent.join('\n') };
}

module.exports = defineConfig({
  e2e: {
    trashAssetsBeforeRuns : false,
    setupNodeEvents(on, config) {
      on('task', { downloadFile });
      on('task', verifyDownloadTasks);
      on('task', {
        async loadAndParsePDF(pdfUrl) {
          try {
            return await loadAndExtractText(pdfUrl);
          } catch (error) {
            throw error;
          }
        }
      });
    }
  }
});