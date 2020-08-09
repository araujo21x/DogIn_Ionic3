describe('recover-password page', () => {

    beforeEach(() =>{
        cy.visit('http://localhost:8100/#/recover-password');
    })

    it('insert in field', () =>{

        const basicUser = {
            email: 'araujolucas97@teste.com'
        }

        cy.get('ion-input[name="email"]')
            .children()
            .type(basicUser.email);
    })

    it('send field', () =>{
        cy.get('#recoverPasswordForm').submit();
    })
})