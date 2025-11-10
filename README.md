# Telecentro - QA Automation Challenge

![Playwright](https://img.shields.io/badge/Playwright-1.56.1-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js&logoColor=white)
![Browser](https://img.shields.io/badge/Browser-Chromium-2EAD33?style=flat-square&logo=google-chrome&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-10%20passing-success?style=flat-square)

Suite de pruebas automatizadas para un formulario de registro de usuarios. Implementa 10 casos de prueba con Page Object Model, cubriendo validaciones de negocio, casos extremos y accesibilidad.

---

## Inicio rápido

Requisitos: Node.js 16+ y npm 7+

Instalación:

1. Clonar e instalar dependencias: `git clone <url> && cd telecentro-qa-challenge && npm install`
2. Instalar navegador (solo Chromium): `npx playwright install chromium`
3. Ejecutar tests: `npm test`

---

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta todos los tests (headless, paralelo) |
| `npm run test:demo` | Modo demo (visible, secuencial, slow motion) |
| `npm run test:ui` | Interfaz gráfica de Playwright |
| `npm run test:debug` | Debug paso a paso con inspector |
| `npm run test:report` | Abre el reporte HTML más reciente |
| `npm start` | Levanta el servidor (se inicia automáticamente en tests) |

---

## Estructura

```
tests/
├── registration.spec.ts          # 10 casos de prueba
├── pages/
│   └── RegistrationPage.ts       # Page Object Model
└── data/
    ├── registrationData.json     # Datos de prueba
    └── testData.ts               # Helper TypeScript
```

Stack técnico: Playwright 1.56.1, TypeScript, POM, selectores semánticos (`getByLabel`, `getByRole`).

---

## Interpretación de requerimientos

| Campo | Tipo | Validaciones |
|-------|------|--------------|
| Nombre completo | Obligatorio | ≥ 2 caracteres, solo letras y espacios |
| Email | Obligatorio | Formato válido, sin duplicados |
| Edad | Opcional | Número positivo entre 1-150 (si se completa) |
| Contraseña | Obligatorio | Mínimo 6 caracteres |
| Repetir contraseña | Obligatorio | Debe coincidir exactamente |

---

## Casos de prueba (10)

Casos obligatorios (3):

| # | Test | Validación |
|---|------|------------|
| 1 | Registro exitoso | Flujo completo con datos válidos |
| 2 | Email inválido | Formato de email incorrecto |
| 3 | Contraseñas no coinciden | Validación de coincidencia |

Validaciones adicionales (6):

| # | Test | Validación |
|---|------|------------|
| 4 | Campos vacíos | Errores simultáneos en todos los campos |
| 5 | Edad no numérica | Tipo de dato incorrecto |
| 6 | Edad negativa | Rango de valores |
| 7 | Email duplicado | Registro repetido |
| 8 | Caracteres especiales en nombre | Formato de nombre |
| 9 | Contraseña corta | Longitud mínima |

Accesibilidad (1):

| # | Test | Validación |
|---|------|------------|
| 10 | Navegación por teclado | Funcionalidad completa sin mouse |

---

## Criterios de negocio (resumen)

- Validación de datos: duplicados, formatos y límites razonables (edad 1-150)
- Experiencia de usuario: errores simultáneos y mensajes específicos por campo
- Robustez: casos extremos (edad negativa, texto en numéricos, nombre inválido)

---

## Estrategias de testing (breve)

Page Object Model (POM):

```ts
await registrationPage.fillName('Juan Pérez');
await registrationPage.submit();
await registrationPage.expectSuccessMessage('Juan Pérez');
```

Selectores robustos (prioridad):

```ts
// Por role + name (accesible y estable)
page.getByRole('button', { name: 'Enviar' });
// Por label (semántico)
page.getByLabel('Nombre completo');
// Evitar IDs/clases frágiles
page.locator('#dynamic-id');
```

---

## Resultados

10 tests pasando (≈ 2s) con 3 workers en Chromium.

---

<div align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="80"/>
  <br/>
  <sub>QA Automation Challenge • Telecentro • Noviembre 2025</sub>
</div>
