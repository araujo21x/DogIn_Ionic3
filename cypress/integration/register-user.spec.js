describe('Testes na tela de Cadastro', () => {

    it('Realiza Cadastro de usuário básico.', () => {

        cy.visit('http://localhost:8100/#/register-user');

        // VISUAL VERIFICATION.
        cy.get('ion-title').should('contain', 'Cadastro');
        cy.get('ion-row>ion-col>p').should('contain', 'Selecione o tipo do cadastro.');

        cy.get('ion-checkbox[name="basic"]').click();

        const basicUser = {
            name: 'Australoptecus',
            lastName: 'da Silva Sauro',
            email: 'silva@gmail.com',
            birthDate: '1988-12-31',
            password: 'minhasenha',
            sex: 'M',
            reTypePassword: 'minhasenha'
        }

        Object.keys(basicUser).map((prop) => {
            if (prop === 'birtDate') {
                cy.get('[name="birthDate"]').children().click().type(basicUser.birthDate);
            }
            else if (prop === 'sex') {
                cy.get('[name="sex"]').click()
                cy.get('button').contains('Masculino').click()
                cy.get('button').contains('OK').click()
            }
            else {
                cy.get(`[name=${prop}]`).children().type(basicUser[prop]);
            }
        });

        //cy.get('form').submit();

    });

});