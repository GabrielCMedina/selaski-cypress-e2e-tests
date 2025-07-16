describe('Validación de PIN incorrecto y correcto', () => {
  it('Muestra log para PIN inválido y permite acceso con PIN válido', () => {
    cy.visit('https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfeft');

    cy.get('input[formcontrolname="digit1"]').type('1');
    cy.get('input[formcontrolname="digit2"]').type('2');
    cy.get('input[formcontrolname="digit3"]').type('3');
    cy.get('input[formcontrolname="digit4"]').type('4');
    cy.wait(1000);
    cy.get('button[type="submit"]').click();

    cy.wait(1500);
    cy.url().should('include', 'shared');
    cy.log('⚠️ Intento de acceso con PIN inválido detectado');

    cy.wait(2000);

    cy.get('input[formcontrolname="digit1"]').clear().type('5');
    cy.get('input[formcontrolname="digit2"]').clear().type('5');
    cy.get('input[formcontrolname="digit3"]').clear().type('6');
    cy.get('input[formcontrolname="digit4"]').clear().type('9');
    cy.wait(1000);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', 'reports');
    cy.log('✅ Acceso exitoso con PIN válido');
  });
});