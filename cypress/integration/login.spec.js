describe('login page', () => {

   beforeEach(() => {
        cy.visit('http://localhost:8100/#/login');
    })

    it('insert in fields', ()=> {
        const basicUser = {
            email: 'araujolucas97@teste.com',
            senha: 'teste01'
        }
        
        cy.get('ion-input[name="email"]')
            .children()
            .type(basicUser.email);

        cy.get('ion-input[name="password"]')
        .children()
        .type(basicUser.senha);
    })

    it('send fields', () =>{
        cy.get('#loginForm').submit()
    })
})