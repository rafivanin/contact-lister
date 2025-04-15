import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { Contact, ContactInput } from "../util"
import { TextField } from "@mui/material"
import axios from "axios";
import ContactForm from "./ContactForm";

interface ContactEditFormProps {
    index: number
    contact: Contact;
    setEdit: React.Dispatch<React.SetStateAction<number>>;
    contactList: Contact[];
    setContactList: React.Dispatch<React.SetStateAction<Contact[]>>
}

export default function ContactEditForm({ index, contact, setEdit, contactList, setContactList }: ContactEditFormProps) {
    const {id, firstName, lastName, email, phoneNumber, age} = contact;
    const {register, control, handleSubmit, formState: { errors }} = useForm<ContactInput>({
        defaultValues: {
            firstName,
            lastName,
            email,
            phoneNumber,
            age,
        }
    })

    const onSubmit: SubmitHandler<ContactInput> = (data) => {
        console.log(data);
        axios.put(`http://localhost:3005/contacts/${id}`, data).then((res) => {
            console.log(res);
            const updatedList = [...contactList]
            updatedList.splice(index, 1, res.data)
            setContactList(updatedList) // update contact in frontend
        });
        setEdit(-1);
    }

    return (
        <ContactForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} isEdit={true} />
    )
}