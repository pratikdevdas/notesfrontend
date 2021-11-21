describe('Note App', () => {
    it('front end can be opened',()=>{
        cy.visit('http://localhost:3000')
        cy.contains('Notes')
    })

    it('front end containsd random text', ()=> {
        cy.visit('http://localhost:3000')
        cy.contains('wtf is this app')
    })
})
