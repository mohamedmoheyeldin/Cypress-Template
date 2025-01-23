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

beforeEach(() => {
    cy.visit('/')
    cy.request("/").then((response) => {
        expect(response.status).to.eq(200)
    })
    cy.title().should('eq', 'Google')
})


// Click link containing text
// Usage  cy.clickLink('Buy Now')
Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
})


// Check a token
// Usage  cy.checkToken('abc123')
Cypress.Commands.add('checkToken', (token) => {
    cy.window().its('localStorage.token').should('eq', token)
})


// Download a file
// Usage  cy.downloadFile('https://path_to_file.pdf', 'mydownloads', 'demo.pdf')
Cypress.Commands.add('downloadFile', (url, directory, fileName) => {
    return cy.getCookies().then((cookies) => {
        return cy.task('downloadFile', {
            url,
            directory,
            cookies,
            fileName,
        })
    })
})


// Commands to work with sessionStorage
// Usage  cy.setSessionStorage('token', 'abc123')
// Usage  cy.getSessionStorage('token').should('eq', 'abc123')
Cypress.Commands.add('getSessionStorage', (key) => {
    cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
    cy.window().then((window) => {
        window.sessionStorage.setItem(key, value)
    })
})


// Log in command using UI
// Usage  cy.loginViaUi({ email: 'fake@email.com', password: '$ecret1', name: 'johndoe' })
Cypress.Commands.add('loginViaUi', (user) => {
    cy.session(
        user,
        () => {
            cy.visit('/login')
            cy.get('input[name=email]').type(user.email)
            cy.get('input[name=password]').type(user.password)
            cy.click('button#login')
            cy.get('h1').contains(`Welcome back ${user.name}!`)
        },
        {
            validate: () => {
                cy.getCookie('auth_key').should('exist')
            },
        }
    )
})


// Log in command using request
// can start a chain off of cy
cy.loginViaApi('admin')

// can be chained but will not receive the previous subject
cy.get('button').loginViaApi('user')
Cypress.Commands.add('loginViaApi', (userType, options = {}) => {
    // this is an example of skipping your UI and logging in programmatically

    // setup some basic types
    // and user properties
    const types = {
        admin: {
            name: 'Jane Lane',
            admin: true,
        },
        user: {
            name: 'Jim Bob',
            admin: false,
        },
    }

    // grab the user
    const user = types[userType]

    // create the user first in the DB
    cy.request({
        url: '/seed/users', // assuming you've exposed a seeds route
        method: 'POST',
        body: user,
    })
        .its('body')
        .then((body) => {
            // assuming the server sends back the user details
            // including a randomly generated password
            //
            // we can now login as this newly created user
            cy.request({
                url: '/login',
                method: 'POST',
                body: {
                    email: body.email,
                    password: body.password,
                },
            })
        })
})


// Log out command using UI
// Usage  cy.logout()
Cypress.Commands.add('logout', () => {
    cy.contains('Login').should('not.exist')
    cy.get('.avatar').click()
    cy.contains('Logout').click()
    cy.get('h1').contains('Login')
    cy.getCookie('auth_key').should('not.exist')
})


// Log out command using localStorage End-to-End Only
// Usage  cy.logout()
Cypress.Commands.add('logout', () => {
    cy.window().its('localStorage').invoke('removeItem', 'session')

    cy.visit('/login')
})

