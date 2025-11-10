import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para el formulario de registro
 */
export class RegistrationPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Uso de selectores robustos basados en aria-labels y roles
    this.fullNameInput = page.getByLabel('Nombre completo');
    this.emailInput = page.getByLabel('Correo electrónico');
    this.ageInput = page.getByLabel('Edad');
    this.passwordInput = page.getByLabel('Contraseña', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Repetir contraseña');
    this.submitButton = page.getByRole('button', { name: 'Enviar formulario de registro' });
    this.successMessage = page.locator('#successMessage');
  }

  /**
   * Navega a la página del formulario
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Llena el formulario con los datos proporcionados
   * @param data Objeto con los datos del formulario
   */
  async fillForm(data: {
    fullName?: string;
    email?: string;
    age?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    if (data.fullName !== undefined) {
      await this.fullNameInput.fill(data.fullName);
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }
    if (data.age !== undefined) {
      await this.ageInput.fill(data.age);
    }
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }
    if (data.confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(data.confirmPassword);
    }
  }

  /**
   * Envía el formulario
   */
  async submit() {
    await this.submitButton.click();
  }

  /**
   * Verifica si un campo tiene un error visible
   * @param fieldId ID del campo
   */
  async hasFieldError(fieldId: string): Promise<boolean> {
    const errorElement = this.page.locator(`#${fieldId}-error.show`);
    return await errorElement.isVisible();
  }

  /**
   * Verifica que el mensaje de éxito contenga el nombre esperado
   * @param expectedName Nombre que debería aparecer en el mensaje
   */
  async verifySuccessMessage(expectedName: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(`Registro exitoso. Bienvenido/a, ${expectedName}!`);
  }

  /**
   * Verifica que un mensaje de error específico esté visible
   * @param fieldId ID del campo
   * @param expectedError Mensaje de error esperado
   */
  async verifyErrorMessage(fieldId: string, expectedError: string) {
    const errorElement = this.page.locator(`#${fieldId}-error`);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText(expectedError);
  }
}

