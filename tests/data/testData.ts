/**
 * Test Data Helper
 */

import * as path from 'path';
import * as fs from 'fs';

export interface UserData {
  fullName: string;
  email: string;
  age?: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationTestData {
  validUser: UserData;
  invalidEmail: UserData;
  passwordMismatch: UserData;
  nonNumericAge: UserData;
  negativeAge: UserData;
  duplicateEmail: UserData;
  invalidName: UserData;
  shortPassword: UserData;
  keyboardNavigation: UserData;
}

// Cargar datos desde JSON
const dataPath = path.join(__dirname, 'registrationData.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
export const testData: RegistrationTestData = JSON.parse(rawData);

/**
 * Helper para obtener datos de prueba específicos
 * @param testCase - Nombre del caso de prueba
 * @returns Datos del usuario para el test
 */
export function getTestData(testCase: keyof RegistrationTestData): UserData {
  return testData[testCase];
}

