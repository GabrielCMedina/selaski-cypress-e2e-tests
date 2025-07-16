describe('Flujo de autenticación - PIN correcto y embarque', () => {
  it('Realiza login exitoso, búsqueda de embarque y validación de datos', () => {
    cy.visit('https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfeft');

    cy.get('input[formcontrolname="digit1"]').type('5');
    cy.get('input[formcontrolname="digit2"]').type('5');
    cy.get('input[formcontrolname="digit3"]').type('6');
    cy.get('input[formcontrolname="digit4"]').type('9');
    cy.get('button[type="submit"]').click();

    cy.get('select[name="boardingSelector"]', { timeout: 10000 }).should('be.visible');
    cy.get('select[name="boardingSelector"]').select('EMB-001');

    cy.get('div.table-container', { timeout: 10000 }).should('be.visible');
    cy.contains('td', 'EMB-001').should('exist');
  });
});