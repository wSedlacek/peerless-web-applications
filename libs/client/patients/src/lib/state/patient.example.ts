import { Patient } from './patient.model';

// Names are assumed to be unique for testing
export const FIRST_PATIENT: Patient = { id: '0', name: 'John' };
export const SECOND_PATIENT: Patient = { id: '1', name: 'William' };
export const PATIENTS_SEED = [FIRST_PATIENT, SECOND_PATIENT];

export const NEW_PATIENT: Omit<Patient, 'id'> = { name: 'Cheryl' };
