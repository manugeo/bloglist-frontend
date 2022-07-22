describe('blog list app', () => {
  it('Login page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })
})