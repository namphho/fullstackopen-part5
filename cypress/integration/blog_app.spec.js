import { func } from 'prop-types'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'namphho2210',
      password: '12345678',
      name: 'pham hoang nam',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    const user2 = {
      username: 'hnam2',
      password: '12345678',
      name: 'hoang nam2',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username').should('exist')
    cy.contains('password').should('exist')
    cy.contains('login').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('namphho2210')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()

      cy.contains('logout')
      cy.contains('pham hoang nam logged it')
      cy.contains('create new blog')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('namphho')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()

      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'namphho2210', password: '12345678' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.get('#create-blog-button').click()

      cy.contains('new title new author')
      cy.contains('view')
    })
    it('A blog form is hidden when user click cancel', function () {
      cy.contains('create new blog').click()
      cy.contains('cancel').click()

      cy.contains('create new blog').should('exist')
    })

    describe('user interact with blog list', function () {
      beforeEach(function () {
        cy.addNewBlog({
          title: 'title',
          author: 'author',
          url: 'url',
        })
      })
      it('user can like blog', function () {
        cy.contains('title author').parent().as('myBlogItem')
        cy.get('@myBlogItem').contains('view').click()

        cy.get('@myBlogItem').parent().contains('likes: 0').should('exist')
        cy.get('@myBlogItem').parent().get('#like-button').should('exist')

        cy.get('@myBlogItem').parent().get('#like-button').click()
        cy.get('@myBlogItem').parent().contains('likes: 1').should('exist')
      })

      it('user can delete blog', function () {
        cy.contains('title author').parent().as('myBlogItem')
        cy.get('@myBlogItem').contains('view').click()

        cy.get('@myBlogItem').parent().get('#delete-button').as('deleteButton')
        cy.get('@deleteButton').should('exist')
        cy.get('@deleteButton').click()
        cy.contains('title author').should('not.exist')
      })

      it.only('other user cant delete your blog', function () {
        cy.login({ username: 'hnam2', password: '12345678' })
        cy.contains('title author').parent().as('myBlogItem')
        cy.get('@myBlogItem').contains('view').click()

        cy.get('@myBlogItem').parent().get('#delete-button').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.contains('title author').should('exist')
        cy.get('.error')
          .should('contain', 'Request failed with status code 400')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })
    })

    describe('blog list sort by like', function () {
      beforeEach(function () {
        cy.addNewBlog({
          title: 'title1',
          author: 'author1',
          url: 'url 1',
        })
        cy.addNewBlog({
          title: 'title2',
          author: 'author2',
          url: 'url 2',
        })
        cy.addNewBlog({
          title: 'title3',
          author: 'author3',
          url: 'url 3',
        })
      })

      it('sort items', function () {
        cy.contains('title1 author1').parent().as('blog1')
        cy.get('@blog1').contains('view').click()
        cy.contains('title2 author2').parent().as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.contains('title3 author3').parent().as('blog3')
        cy.get('@blog3').contains('view').click()

        cy.get('@blog2').parent().find('#like-button').click()
        cy.get('@blog2').parent().contains('likes: 1').should('exist')
        cy.get('@blog2').parent().find('#like-button').click()
        cy.get('@blog2').parent().contains('likes: 2').should('exist')
        cy.get('@blog2').parent().find('#like-button').click()
        cy.get('@blog2').parent().contains('likes: 3').should('exist')

        cy.get('@blog3').parent().find('#like-button').click()
        cy.get('@blog3').parent().contains('likes: 1').should('exist')

        cy.get('.blogClass').then((items) => {
          cy.wrap(items[0]).contains('title2 author2').should('exist')
          cy.wrap(items[1]).contains('title3 author3').should('exist')
          cy.wrap(items[2]).contains('title1 author1').should('exist')
        })
      })
    })
  })
})
