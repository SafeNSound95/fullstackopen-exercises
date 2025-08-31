describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST','http://localhost:3001/api/users', { username:'tester99', name:"tester", password:1234 })
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('login')
  })

   describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester99')
      cy.get('#password').type(1234)
      cy.get('#login-button').click()
      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester99')
      cy.get('#password').type(1234)
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('tester99')
      cy.get('#password').type(1234)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.contains('label',"title").type('a blog created by cypress')
      cy.contains('label',"author").type('the testing man')
      cy.contains('label',"url").type('www.webetesting.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function() {
     beforeEach(function () {
        cy.contains('create new blog').click()
        cy.contains('label',"title").type('another blog created by cypress')
        cy.contains('label',"author").type('the testing man strikes again')
        cy.contains('label',"url").type('www.webetestingagain.com')
        cy.contains('save').click()
      })

      it('it can be liked', function () {
       cy.contains('show').click()
       cy.contains('like').click()
       cy.contains('likes 1')
      })
    })
  })

})