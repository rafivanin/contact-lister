import React from 'react';
import { useForm, SubmitHandler, Controller, SubmitErrorHandler } from 'react-hook-form';
import axios from 'axios';
import { Contact, ContactInput } from '../util';
import { TextField } from '@mui/material';
import ContactForm from './ContactForm';

interface ContactCreateFormProps {
    setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
    contactList: Contact[];
    setContactList: React.Dispatch<React.SetStateAction<Contact[]>>
}

export default function ContactCreateForm({setCreateMode, contactList, setContactList}: ContactCreateFormProps) {
    const {control, handleSubmit, formState: {errors}} = useForm<ContactInput>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            age: 0,
        }
    })
    const onSubmit: SubmitHandler<ContactInput> = (data) => {
        console.log(data);
        axios.post('http://localhost:3005/contacts', data).then((res) => {
            console.log(res);
            setContactList([...contactList, res.data]) // add newly created contact in frontend
        });
        setCreateMode(false);
    }

    return (
        <ContactForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
    )
}