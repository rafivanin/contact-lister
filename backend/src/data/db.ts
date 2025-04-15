import sqlite from 'better-sqlite3';
import path from 'path';

export interface ContactParams {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number;
}

const db = new sqlite(path.resolve(__dirname, 'contacts.db'), { fileMustExist: true, verbose: console.log });

export function getAllContacts() {
    const data = db.prepare('SELECT * FROM contacts').all();

    return {contacts: data};
}

export function getOneContact(id: number) {
    const data = db.prepare('SELECT * FROM contacts where id = ?').get(id);

    return data;
}

export function insertContact(params: ContactParams) {
    const info = db
        .prepare('INSERT INTO contacts (firstName, lastName, email, phoneNumber, age) VALUES (@firstName, @lastName, @email, @phoneNumber, @age)')
        .run(params);

    const data = db.prepare('SELECT * FROM contacts where id = ?').get(info.lastInsertRowid);

    return data
}

export function updateContact(id: number, params: ContactParams) {
    const info = db.prepare('UPDATE contacts SET firstName = (@firstName), lastName = (@lastName), email = (@email), phoneNumber = (@phoneNumber), age = (@age) WHERE id = (@id)')
        .run({...params, id: id});

    const data = db.prepare('SELECT * FROM contacts where id = ?').get(id);

    return data
}

export function deleteContact(id: number) {
    const info = db.prepare('DELETE FROM contacts where id = (?)').run(id);
}