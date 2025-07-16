describe('Validación de múltiples embarques con advertencias en datos vacíos', () => {
  const limpiarFiltroSiExiste = () => {
    cy.document().then((doc) => {
      const limpiar = doc.querySelector('div.tag-tertiary span.tag-icon');
      if (limpiar) {
        cy.wrap(limpiar).click({ force: true });
        cy.wait(1000);
      }
    });
  };

  const verificarCampo = (label, valor) => {
    if (!valor || valor === '-' || valor === 'false') {
      cy.log(`⚠️ Advertencia: el campo "${label}" está vacío o tiene un valor inválido ("${valor}")`);
    } else {
      cy.root().then(($root) => {
        const found = $root.find(`*:contains("${valor}")`);
        if (found.length > 0) {
          cy.log(`✅ Validación exitosa: campo "${label}" contiene el valor "${valor}"`);
        } else {
          cy.log(`⚠️ Advertencia: el valor "${valor}" para el campo "${label}" no se encontró dentro del contenedor.`);
        }
      });
    }
  };

  it('Filtra y valida los datos de varios embarques', () => {
    cy.visit('https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfeft');

    cy.get('input[formcontrolname="digit1"]').type('5');
    cy.get('input[formcontrolname="digit2"]').type('5');
    cy.get('input[formcontrolname="digit3"]').type('6');
    cy.get('input[formcontrolname="digit4"]').type('9');
    cy.wait(500);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', 'reports');
    cy.wait(3000);

    const embarques = [
      {
        codigo: 'CALUMET-02',
        campoPersonalizado: 'false',
        eta: '07/02/2025',
        puertoDestino: 'No Seleccionado',
        proveedor: ''
      },
      {
        codigo: 'Carga embarque07',
        campoPersonalizado: 'false',
        eta: '21/06/2025',
        puertoDestino: 'Valparaiso',
        proveedor: ''
      },
      {
        codigo: '4400003029-01',
        campoPersonalizado: 'false',
        eta: '14/07/2025',
        puertoDestino: 'No Seleccionado',
        proveedor: 'Proveedor API 1'
      },
      {
        codigo: 'Carga embarque05',
        campoPersonalizado: 'false',
        eta: '25/06/2025',
        puertoDestino: 'No Seleccionado',
        proveedor: ''
      },
      {
        codigo: 'Carga embarque06',
        campoPersonalizado: 'false',
        eta: '-',
        puertoDestino: 'No Seleccionado',
        proveedor: ''
      }
    ];

    embarques.forEach((embarque) => {
      cy.wait(1000);

      limpiarFiltroSiExiste();

      cy.get('.filter-tab', { timeout: 10000 }).click({ force: true });
      cy.wait(1000);

      cy.get('body').then(($body) => {
        if ($body.find('.select-btn').length === 0) {
          cy.get('.filter-tab', { timeout: 10000 }).click({ force: true });
          cy.wait(1000);
        }
      });

      cy.get('.select-btn', { timeout: 10000 }).first().click({ force: true });
      cy.wait(1000);

      cy.get('span.cursor-pointer').contains('Embarque').should('be.visible').click({ force: true });
      cy.wait(1000);

      cy.get('input[placeholder="Escribe aquí tu búsqueda"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.have.class', 'cursor-not-allowed')
        .clear()
        .type(`${embarque.codigo}{enter}`);

      cy.wait(2000);

      cy.contains(embarque.codigo, { timeout: 10000 }).should('exist');

      cy.contains(embarque.codigo)
        .first()
        .parentsUntil('.table-first-element')
        .parent()
        .first()
        .within(() => {
          verificarCampo('Campo Personalizado', embarque.campoPersonalizado);
          verificarCampo('ETA', embarque.eta);
          verificarCampo('Puerto Destino', embarque.puertoDestino);
          verificarCampo('Proveedor', embarque.proveedor);
        });

      cy.wait(1000);
    });
  });
});