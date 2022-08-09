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
    });

    describe('And when a blog already exists', () => {
      beforeEach(() => {
        cy.contains('Create new').click();
        cy.get('#title').type('Sample Test Note');
        cy.get('#author').type('Sample Tester');
        cy.get('#url').type('sampleurl.com');
        cy.get('#create-button').click();
        cy.get('#cancel-button').click();
      });

      it('It can be liked', () => {
        cy.get('#blog-container').contains('view').click();
        cy.get('#likes-text').invoke('text').then((likesText) => {
          const initialLikes = parseInt(likesText.split(' ')[1]);
          console.log('initialLikes :', initialLikes);
          cy.get('#blog-container').contains('like').click();
          cy.wait(1000);
          cy.get('#likes-text').invoke('text').then((newText) => {
            const newLikes = parseInt(newText.split(' ')[1]);
            console.log('newLikes :', newLikes);
            expect(newLikes).to.eq(initialLikes + 1);
          });
        });
      });

      it('It can be removed', () => {
        cy.get('#blog-container').contains('view').click();
        cy.get('#blog-container').get('#remove-button').click();
        cy.contains('Sample Test Note').should('not.exist');
        cy.contains('Blog deleted successfully!');
      });
    });
  });
});