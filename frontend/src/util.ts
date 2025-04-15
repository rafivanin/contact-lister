export type Contact = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    age: number
}

export interface ContactInput {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    age: number
}