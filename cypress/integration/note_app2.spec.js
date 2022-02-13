describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  // it.only run specific test
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  // it('login fails with wrong password', function(){
  //   cy.contains('log in').click()
  //   cy.get('#username').type('mluukkai')
  //   cy.get('#password').type('wrong')
  //   cy.get('#login-button').click()
  //   // Using should is a bit trickier than using contains, but it allows for more diverse tests than contains which works based on text content only.
  //   cy.get('.error').should('contain','Wrong credentials')
  //     // make sure that the error message is red and it has a border:
  //     // Because all tests are for the same component we accessed using cy.get, we can chain them using and.
  //     .and('have.css','color', 'rgb(255, 0, 0)')
  //     .and('have.css','border-style','solid')
  //   cy.get('html').should('not.contain', 'Matti')

  // })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'mluukkai', password:'salainen' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      describe('a several note exists', function(){
        beforeEach(function () {
          cy.createNote({
            content:'first note',
            important:false
          })
          cy.createNote({
            content:'second note',
            important:false
          })
          cy.createNote({
            content:'third',
            important:false
          })
        })

        it('one of those can be made important', function () {
          cy.contains('second note')
            .parent().find('button')
            .as('theButton')
            .click()

          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'make not important')
        })
      })
    })
  })
})