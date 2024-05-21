/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

describe('demoblazeTests', () => {
    let testData;

    beforeEach(() => {
        testData = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            product: 'Samsung galaxy s6',
        };

        cy.visit('https://www.demoblaze.com/');
    });

    it('should allow to register and then login', () => {
        cy.get('#signin2').click();
        cy.wait(1000);
        cy.get('#sign-username').type(testData.username);
        cy.get('#sign-password').type(testData.password);
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq('Sign up successful.');
        });

        cy.get('#login2').click();
        cy.wait(1000);
        cy.get('#loginusername').type(testData.username);
        cy.get('#loginpassword').type(testData.password);
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });
        cy.get('#nameofuser').should('contain', testData.username);
    });

    it('should allow to add Samsung Galaxy s6 to the cart after login', () => {
        cy.get('#signin2').click();
        cy.wait(1000);
        cy.get('#sign-username').type(testData.username);
        cy.get('#sign-password').type(testData.password);
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq('Sign up successful.');
        });

        cy.get('#login2').click();
        cy.wait(1000);
        cy.get('#loginusername').type(testData.username);
        cy.get('#loginpassword').type(testData.password);
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });
        cy.get('#nameofuser').should('contain', testData.username);

        cy.contains('.hrefch', testData.product).click();
        cy.get('.col-sm-12 > .btn').click();

        cy.get('#cartur').click();
        cy.get('.success > :nth-child(2)').should('contain', testData.product);
    });
});