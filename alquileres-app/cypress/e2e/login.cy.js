describe('Login test', () => {
    beforeEach(() => {
        cy.fixture('credentials').as('credentials')        
        cy.visit('https://tp-dsw-frontend-theta.vercel.app/login')
        cy.contains('Iniciar sesión').should('be.visible')
    })

    it('Succesfulling login', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-0')
                .type(credentials.email)
                .should('have.value', credentials.email)
            cy.get('#ion-input-1')
                .type(credentials.password)
                .should('have.value', credentials.password)
            cy.get('ion-button[type="submit"]').click()
            cy.url().should('include', 'https://tp-dsw-frontend-theta.vercel.app/dashboard')
        })
    })

    it('Login with wrong password', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-0')
                .type(credentials.email)
                .should('have.value', credentials.email)
            cy.get('#ion-input-1')
                .type(credentials.invalidPassword)
                .should('have.value', credentials.invalidPassword)
            cy.get('ion-button[type="submit"]').click()
            cy.get('ion-text.error-text')
                .should('be.visible')
                .and('contain', 'Credenciales incorrectas')
        })
    })

    it('Login with wrong email and correct password', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-0')
                .type(credentials.invalidEmail)
                .should('have.value', credentials.invalidEmail)
            cy.get('#ion-input-1')
                .type(credentials.password)
                .should('have.value', credentials.password)
            cy.get('ion-button[type="submit"]').click()
            cy.get('ion-text.error-text')
                .should('be.visible')
                .and('contain', 'Credenciales incorrectas')
        })
    })

    it('Login with empty fields', () => {
        cy.get('ion-button[type="submit"]').should('have.class', 'button-disabled')
    })

    it('Login with empty email', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-1')
                .type(credentials.password)
                .should('have.value', credentials.password)
            cy.get('ion-button[type="submit"]').should('have.class', 'button-disabled')
        })

    })

    it('Login with empty password', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get ('#ion-input-0')
                .type(credentials.email)
                .should('have.value', credentials.email)
            cy.get('ion-button[type="submit"]').should('have.class', 'button-disabled')
        })
    })

    it('Login with invalid email format', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-0')
                .type(credentials.invalidEmailFormat)
                .should('have.value', credentials.invalidEmailFormat)
            cy.get('#ion-input-1')
                .type(credentials.password)
                .should('have.value', credentials.password)
            cy.get('ion-button[type="submit"]').should('have.class', 'button-disabled')
        })
    })

    it('Persistent login', () => {
        cy.get('@credentials').then((credentials) => {
            cy.get('#ion-input-0')
                .type(credentials.email)
                .should('have.value', credentials.email)
            cy.get('#ion-input-1')
                .type(credentials.password)
                .should('have.value', credentials.password)
            cy.get('ion-button[type="submit"]').click()
            cy.url().should('include', 'https://tp-dsw-frontend-theta.vercel.app/dashboard')
            cy.reload()
            cy.url().should('include', 'https://tp-dsw-frontend-theta.vercel.app/dashboard')
            cy.get('.avatar').click()
            cy.contains('Cerrar sesión').click()
            cy.url().should('include', 'https://tp-dsw-frontend-theta.vercel.app/login')
        })
    })
});