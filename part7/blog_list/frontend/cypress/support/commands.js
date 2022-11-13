// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const BACKEND_URL = 'http://localhost:3003';

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${BACKEND_URL}/api/login`, {
    username,
    password,
  }).then((response) => {
    // Set user in local storage + redirect to page
    localStorage.setItem('user', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', (blogData) => {
  cy.request({
    url: `${BACKEND_URL}/api/blogs`,
    method: 'POST',
    body: blogData,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});
