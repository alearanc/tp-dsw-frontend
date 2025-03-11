# Escapeo
Aplicación desarrollada en Angular 18 con Ionic para la interfaz de usuario, permitiendo que los usuarios puedan buscar y reservar propiedades (inmuebles) de manera intuitiva.

## Requisitos previos
- Node.js
- Angular CLI
- Ionic CLI

## Instalación y configuración
1. Clonar el repositorio
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el proyecto
   ```bash
   ionic serve
   ```

### E2E
1. Instalar cypress:
   ```bash
   npm install cypress --save-dev
   ```
2. Ejecutar cypress:
   ```bash
   npx cypress open
   ```
3. Seleccionar E2E Testing
4. Seleccionar un navegador, de preferencia, Firefox
5. Start E2E Testing in Firefox
6. Una vez en el navegador, seleccionar login.cy.js

## Principales funcionalidades
### Como admin
- CRUD de tipos de inmueble
- CRUD de localidades
- CRUD de servicios
### Como propietario
- Carga / Edición / Eliminación de un inmueble
- Listado de inmuebles de su propiedad
### Como huesped
- Búsqueda y filtrado de inmuebles disponibles
- Crear una reserva
- Cancelar una reserva
- Valorar un inmueble

## Tecnologías
- Angular 18
- Ionic Framework
- Cypress 14

## Autores
- Altamirano, Edgar Gastón
- Arancibia, Alexis Alejandro
- Gonzalez, Alexis
- Jiménez, Verónica
