# Automatización de pruebas e2e con Cypress

Este proyecto contiene las pruebas automatizadas end-to-end (E2E) para validar el flujo de autenticación por PIN, filtrado de embarques y validación de datos en la plataforma Selaski, usando Cypress.

## Estructura del proyecto

```
cypress/
  e2e/
    auth_embarque.cy.js         # Flujo principal: login, filtros y validación de datos
    auth.errorPin.cy.js         # Flujo negativo: intento de acceso con PIN incorrecto
  screenshots/                  # Evidencias (opcional, se puede ignorar)
.gitignore                      # Exclusión de node_modules, screenshots, etc.
```

## Requisitos

- Node.js instalado
- Cypress instalado (local o global)

```bash
npm install
npx cypress open
```

## Pruebas implementadas

### 1. Autenticación por PIN (positivo y negativo)

- Valida que el sistema permita el acceso solo con un PIN correcto.
- Se prueba también el comportamiento con un PIN incorrecto.

### 2. Filtrado por embarque

- Luego del login, se accede al módulo de filtros.
- Se selecciona la categoría "Embarque".
- Se ingresan distintos códigos de embarque y se verifica que los resultados coincidan.

### 3. Validación de datos del embarque

- Se revisan campos como ETA, Proveedor, Puerto Destino, etc.
- Si alguno de los valores está vacío, se registra una advertencia en el log.
- No se fuerza el fallo del test por datos incompletos, sino que se deja evidencia de la anomalía.

### 4. Robustez y control de errores

- Se agregaron esperas dinámicas y validaciones condicionales.
- El test no se rompe si hay valores como "-" o "false" en columnas sensibles.
- Se limpia el filtro antes de cada búsqueda para mantener el flujo estable.

## Consideraciones

- El flujo con PIN incorrecto **solo se ejecuta una vez** de forma aislada para evitar bloqueos por múltiples intentos fallidos.
- Las validaciones se hacen con `cy.contains()` en contexto, usando `cy.root()` para mantener la precisión dentro de `.within()`.
- El test es reutilizable con más embarques si se agregan al array principal.

## Comando para ejecutar

```bash
npx cypress open
```

Seleccionar el archivo `auth_embarque.cy.js` o `auth.errorPin.cy.js` según la prueba que se desea correr.

---

Realizado con enfoque técnico, priorizando claridad, manejo de errores y trazabilidad de los datos validados.

