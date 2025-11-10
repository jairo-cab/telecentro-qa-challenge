import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';
import { getTestData } from './data/testData';

/**
 * Suite de pruebas para el formulario de registro
 * 
 * Casos de prueba implementados:
 * 1. Registro exitoso (obligatorio)
 * 2. Fallo por email inválido (obligatorio)
 * 3. Fallo por contraseñas no coincidentes (obligatorio)
 * 4. Validación de campos vacíos
 * 5. Validación de edad con valores no numéricos y negativos
 * 6. Email duplicado
 * 7. Accesibilidad - navegación por teclado
 */

test.describe('Formulario de Registro - Casos Principales', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  /**
   * Caso 1: Registro exitoso
   * Verifica que un usuario pueda registrarse exitosamente con datos válidos
   * Criterios de negocio:
   * - Todos los campos obligatorios completados correctamente
   * - Email con formato válido
   * - Contraseña de al menos 6 caracteres
   * - Contraseñas coincidentes
   * - Mensaje de éxito debe mostrar el nombre del usuario
   */
  test('debe registrar un usuario exitosamente con datos válidos', async () => {
    const userData = getTestData('validUser');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar mensaje de éxito con el nombre del usuario
    await registrationPage.verifySuccessMessage(userData.fullName);
  });

  /**
   * Caso 2: Fallo por email inválido
   * Verifica que el sistema rechace emails con formato incorrecto
   * Criterios de negocio:
   * - Email debe tener formato válido (usuario@dominio.extension)
   * - Debe mostrar mensaje de error específico
   */
  test('debe mostrar error con email inválido', async () => {
    const userData = getTestData('invalidEmail');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar que aparece el error de email inválido
    await registrationPage.verifyErrorMessage('email', 'El email no es válido');
  });

  /**
   * Caso 3: Fallo por contraseñas no coincidentes
   * Verifica que el sistema valide que ambas contraseñas sean idénticas
   * Criterios de negocio:
   * - La contraseña y su confirmación deben ser exactamente iguales
   * - Debe mostrar error específico en el campo de confirmación
   */
  test('debe mostrar error cuando las contraseñas no coinciden', async () => {
    const userData = getTestData('passwordMismatch');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar mensaje de error en confirmación de contraseña
    await registrationPage.verifyErrorMessage('confirmPassword', 'Las contraseñas no coinciden');
  });
});

test.describe('Formulario de Registro - Validaciones Adicionales', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  /**
   * Caso 4: Validación de todos los campos vacíos
   * Verifica que el sistema valide todos los campos obligatorios simultáneamente
   * Criterios de negocio:
   * - Debe mostrar errores para todos los campos obligatorios vacíos
   * - Los errores deben ser claros y específicos
   */
  test('debe mostrar errores cuando todos los campos obligatorios están vacíos', async () => {
    // Enviar formulario vacío
    await registrationPage.submit();

    // Verificar que hay errores en todos los campos obligatorios
    expect(await registrationPage.hasFieldError('fullname')).toBe(true);
    expect(await registrationPage.hasFieldError('email')).toBe(true);
    expect(await registrationPage.hasFieldError('password')).toBe(true);
    expect(await registrationPage.hasFieldError('confirmPassword')).toBe(true);
  });

  /**
   * Caso 5: Edad con valor no numérico
   * Verifica que el campo edad solo acepte números
   * Criterios de negocio:
   * - El campo edad es opcional
   * - Si se completa, debe ser un valor numérico válido
   */
  test('debe mostrar error cuando la edad no es un número', async () => {
    const userData = getTestData('nonNumericAge');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar error de edad no numérica
    await registrationPage.verifyErrorMessage('age', 'La edad debe ser un número');
  });

  /**
   * Caso 6: Edad con valor negativo
   * Verifica que el sistema rechace edades negativas
   * Criterios de negocio:
   * - La edad debe ser un número positivo mayor a 0
   * - No se aceptan valores negativos
   */
  test('debe mostrar error cuando la edad es negativa', async () => {
    const userData = getTestData('negativeAge');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar error de edad negativa
    await registrationPage.verifyErrorMessage('age', 'La edad debe ser un número');
  });

  /**
   * Caso 7: Email duplicado
   * Verifica que el sistema no permita registrar emails ya existentes
   * Criterios de negocio:
   * - Cada email debe ser único en el sistema
   * - Los emails ya registrados deben ser rechazados
   */
  test('debe mostrar error cuando el email ya está registrado', async () => {
    const userData = getTestData('duplicateEmail');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar error de email duplicado
    await registrationPage.verifyErrorMessage('email', 'Este email ya está registrado');
  });

  /**
   * Caso 8: Validación de nombre con caracteres especiales
   * Verifica que el campo nombre solo acepte letras y espacios
   * Criterios de negocio:
   * - El nombre debe contener solo letras (incluidas letras acentuadas)
   * - No se permiten números ni caracteres especiales
   */
  test('debe mostrar error cuando el nombre contiene caracteres no permitidos', async () => {
    const userData = getTestData('invalidName');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar error de caracteres no permitidos
    await registrationPage.verifyErrorMessage('fullname', 'El nombre solo puede contener letras y espacios');
  });

  /**
   * Caso 9: Contraseña con menos de 6 caracteres
   * Verifica que se cumpla el requisito mínimo de longitud de contraseña
   * Criterios de negocio:
   * - La contraseña debe tener al menos 6 caracteres
   * - Debe rechazar contraseñas más cortas
   */
  test('debe mostrar error cuando la contraseña tiene menos de 6 caracteres', async () => {
    const userData = getTestData('shortPassword');

    await registrationPage.fillForm(userData);
    await registrationPage.submit();

    // Verificar error de longitud de contraseña
    await registrationPage.verifyErrorMessage('password', 'La contraseña debe tener al menos 6 caracteres');
  });
});

test.describe('Formulario de Registro - Pruebas de Accesibilidad', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  /**
   * Caso 10: Navegación por teclado
   * Verifica que el formulario sea navegable usando solo el teclado
   * Criterios de accesibilidad:
   * - Todos los campos deben ser accesibles con Tab
   * - Los labels deben estar correctamente asociados
   * - El formulario debe poder completarse sin mouse
   */
  test('debe permitir completar el formulario usando solo el teclado', async ({ page }) => {
    // Obtener datos de prueba
    const userData = getTestData('keyboardNavigation');

    // Navegar al primer campo usando Tab
    await page.keyboard.press('Tab');
    
    // Verificar que el primer campo (nombre) tiene el foco
    await expect(registrationPage.fullNameInput).toBeFocused();
    
    // Llenar el campo con el teclado
    await page.keyboard.type(userData.fullName);

    // Navegar al siguiente campo
    await page.keyboard.press('Tab');
    await expect(registrationPage.emailInput).toBeFocused();
    await page.keyboard.type(userData.email);

    // Continuar con edad
    await page.keyboard.press('Tab');
    await expect(registrationPage.ageInput).toBeFocused();
    await page.keyboard.type(userData.age!);

    // Continuar con contraseña
    await page.keyboard.press('Tab');
    await expect(registrationPage.passwordInput).toBeFocused();
    await page.keyboard.type(userData.password);

    // Continuar con confirmar contraseña
    await page.keyboard.press('Tab');
    await expect(registrationPage.confirmPasswordInput).toBeFocused();
    await page.keyboard.type(userData.confirmPassword);

    // Navegar al botón y enviarlo con Enter
    await page.keyboard.press('Tab');
    await expect(registrationPage.submitButton).toBeFocused();
    await page.keyboard.press('Enter');
    
    // Verificar que el registro fue exitoso
    await registrationPage.verifySuccessMessage(userData.fullName);
  });
});

