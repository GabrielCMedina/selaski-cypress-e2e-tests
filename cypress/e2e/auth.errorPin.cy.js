describe('Flujo de autenticación - PIN incorrecto', () => {
    it('Muestra error al ingresar un PIN incorrecto', () => {
      cy.visit('https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfeft');
  
      cy.get('input[formcontrolname="digit1"]').type('0');
      cy.get('input[formcontrolname="digit2"]').type('0');
      cy.get('input[formcontrolname="digit3"]').type('0');
      cy.get('input[formcontrolname="digit4"]').type('0');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Código incorrecto', { timeout: 10000 }).should('be.visible');
    });
  });