import { Schema } from "express-validator";

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number;
}

export const contactSchema: Schema = {
    firstName: { exists: true, isString: true },
    lastName: { exists: true, isString: true },
    email: { exists: true, isEmail: true },
    phoneNumber: { exists: true, isMobilePhone: { options: 'en-US' } },
    age: { exists: true, isInt: { options: { min: 0, max: 150 } } }
}