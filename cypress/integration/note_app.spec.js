describe('Note App', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user ={
      name:'Matti Luukkainen',
      username:'mluukkai',
      password:'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front end can be opened',() => {
    cy.contains('Notes')
  })

  // the test fails
  // it('front end containsd random text', () => {
  //   cy.contains('wtf is this app')
  // })

  //mocha deos not recommennd arrow function
  it('login form can be opened', function(){
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged-in')
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('a note exists', function(){
      beforeEach(function(){
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })

    })

  })
})

