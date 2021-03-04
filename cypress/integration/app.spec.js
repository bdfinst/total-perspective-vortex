describe('App test', () => {
  it('can load the value stream map', () => {
    cy.visit('/ValueStream')
    cy.get('.MuiContainer-root')
  })
  it('should accept data entry', () => {
    cy.visit('/ValueStream')
    cy.get('[data-id="1"]').dblclick()
    cy.get(
      '.MuiGrid-container.MuiGrid-grid-xs-12 > .MuiGrid-root > .MuiPaper-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input',
    )
      .type('Node 1')
      .should('have.value', 'Node 1')
    cy.get(
      ':nth-child(2) > .MuiGrid-grid-xs-10 > .MuiPaper-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input',
    ).type('20')
    cy.get(
      ':nth-child(3) > .MuiGrid-grid-xs-10 > .MuiPaper-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input',
    ).type('10')
    cy.get(
      ':nth-child(5) > .MuiGrid-grid-xs-10 > .MuiPaper-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input',
    ).type('1')
    cy.get('.MuiButton-textPrimary > .MuiButton-label').click()
    cy.get(
      '.selected > :nth-child(2) > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > .MuiTableCell-root > .MuiTypography-root',
    ).should('contain', 'Node 1')
    cy.get(
      '.selected > :nth-child(2) > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > [data-testid=processTime] > .MuiTableCell-alignRight',
    ).should('contain', '20')
    cy.get(
      '.selected > :nth-child(2) > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > [data-testid=waitTime] > .MuiTableCell-alignRight',
    ).should('contain', '10')
    cy.get(
      '.selected > :nth-child(2) > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > [data-testid=people] > .MuiTableCell-alignRight',
    ).should('contain', '1')
  })
})
