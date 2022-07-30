describe('Blog List App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Tester Manu',
      username: 'manugeo',
      password: '09946994959'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('App opens at login page', () => {
    cy.contains('Log in to application');
  });

  it('A valid user can login', () => {
    cy.get('#username').type('manugeo');
    cy.get('#password').type('09946994959');
    cy.get('#login-button').click();
    cy.contains('Tester Manu logged-in');
  });

  it('Invalid user cannot', () => {
    cy.get('#username').type('sony');
    cy.get('#password').type('0987777777');
    cy.get('#login-button').click();
    cy.contains('Log in to application');
  });

  describe('When a user is logged in...', () => {
    beforeEach(() => {
      cy.get('#username').type('manugeo');
      cy.get('#password').type('09946994959');
      cy.get('#login-button').click();
    });

    it('A new blog can be created', () => {
      cy.contains('Create new').click();
      cy.get('#title').type('Sample Test Note');
      cy.get('#author').type('Sample Tester');
      cy.get('#url').type('sampleurl.com');
      cy.get('#create-button').click();
      cy.get('#cancel-button').click();
      cy.contains('Sample Test Note');
    })

    // Todo
    // Make a test which checks that users can like a blog.
    // Make a test for ensuring that the user who created a blog can delete it.
  });
});