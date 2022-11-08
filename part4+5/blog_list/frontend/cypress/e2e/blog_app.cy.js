/* eslint-disable jest/expect-expect */
const BACKEND_URL = 'http://localhost:3003';

describe('Blog app', function () {
  const user1 = Object.freeze({
    username: 'user1',
    name: 'User 1',
    password: 'StrongPassword1234',
  });

  const blog1 = Object.freeze({
    title: 'Blog1 Title',
    author: 'Blog1 Author',
    url: 'blog1.url.com',
  });

  const blog2 = Object.freeze({
    title: 'Blog2 Title',
    author: 'Blog2 Author',
    url: 'blog2.url.com',
    likes: 5,
  });

  const blog3 = Object.freeze({
    title: 'Blog3 Title',
    author: 'Blog3 Author',
    url: 'blog3.url.com',
    likes: 3,
  });

  beforeEach(function () {
    cy.request('POST', `${BACKEND_URL}/api/testing/reset`);
    cy.request('POST', `${BACKEND_URL}/api/users`, user1);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.get('button[type="submit"]').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type(user1.username);
      cy.get('input[name="password"]').type(user1.password);
      cy.get('button[type="submit"]').contains('login').click();
      cy.contains(`${user1.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type(user1.username);
      cy.get('input[name="password"]').type('Wrong password');
      cy.get('button[type="submit"]').contains('login').click();
      cy.contains('Log in to application');
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user1.username, password: user1.password });
    });

    it('can create blog', function () {
      cy.contains('button', 'new blog').click();
      ['title', 'author', 'url'].forEach((attribute) => {
        cy.get(`input[name="${attribute}"]`).type(blog1[attribute]);
      });
      cy.contains('button', 'create').click();

      ['title', 'author', 'url'].forEach((attribute) => {
        cy.contains(blog1[attribute]);
      });

      cy.get('.blog-list').children().should('have.length', 1);
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog(blog1);
        cy.createBlog(blog2);
        cy.createBlog(blog3);
      });

      it('can like a blog', function () {
        cy.contains('.blog', 'Blog1 Title Blog1 Author')
          .contains('button', 'view')
          .click();
        cy.contains('.blog', 'Blog1 Title Blog1 Author')
          .contains('button', 'like')
          .click();
        cy.contains('.blog', 'Blog1 Title Blog1 Author').contains('likes 1');
      });

      it.only('blogs are sorted properly', function () {
        cy.get('.blog').eq(0).should('contain', blog2.title);
        cy.get('.blog').eq(1).should('contain', blog3.title);
        cy.get('.blog').eq(2).should('contain', blog1.title);
      });
    });
  });
});
