import { Router, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { Contact, contactSchema } from '../models/contact';
import { ContactParams, getAllContacts, getOneContact, insertContact, updateContact, deleteContact } from '../data/db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(getAllContacts());
});

router.get('/:id', (req: Request, res: Response) => {
    const contactId = parseInt(req.params.id);

    const contact = getOneContact(contactId);

    if (!contact) {
        res.status(404).send(`Contact with id ${contactId} not found`);
    } else {
        res.json(contact);
    }
})

router.post(
    '/',
    checkSchema(contactSchema, ['body']),
    (req: Request, res: Response) => {
        const {firstName, lastName, email, phoneNumber, age} = req.body;
        const params: ContactParams = {
            firstName,
            lastName,
            email,
            phoneNumber,
            age: parseInt(age),
        };

        const contact = insertContact(params);
        res.status(201).json(contact);
    },
);

router.put(
    '/:id',
    checkSchema(contactSchema, ['body']),
    (req: Request, res: Response) => {
        const contactId = parseInt(req.params.id);

        const contact = getOneContact(contactId);

        if (!contact) {
            res.status(404).send(`Contact with id ${contactId} not found`);
        } else {
            const {firstName, lastName, email, phoneNumber, age} = req.body;
            const params: ContactParams = {
                firstName,
                lastName,
                email,
                phoneNumber,
                age: parseInt(age),
            };

            const contact = updateContact(contactId, params);
            res.status(200).json(contact);
        }
    }
);

router.delete('/:id', (req: Request, res: Response) => {
    const contactId = parseInt(req.params.id);

    deleteContact(contactId);
    res.status(204).send();
});

export default router;