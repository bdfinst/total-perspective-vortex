describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.selected > .node-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #processTime').click();
    cy.get('.selected > .node-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #processTime').click();
    cy.get('.selected > .node-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #processTime').click();
    cy.get('.selected').click();
    cy.get('.selected > .node-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #cycleTime').click();
    /* ==== End Cypress Studio ==== */
  })
})
