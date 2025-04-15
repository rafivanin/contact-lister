import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Card, CardActionArea, CardContent, CardHeader, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Contact } from '../util';
import ContactCreateForm from "./ContactCreateForm";
import ContactEditForm from "./ContactEditForm";

export default function ContactList() {
    const [createMode, setCreateMode] = useState<boolean>(false);
    const [edit, setEdit] = useState<number>(-1);
    const [contactList, setContactList] = useState<Contact[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3005/contacts').then(res => {
            console.log(res);
            setContactList(res.data.contacts as Contact[]);
        });
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3005/contacts/${id}`)
            .then(res => {
                console.log(res);
            });

        setContactList(contactList.filter(contact => contact.id !== id)) // remove contact from frontend
    }

    return (
        <Box sx={{overflow: "scroll", padding: 20}}>
            <Stack spacing={2}>
                {contactList.map((contact, index) => {
                    return (
                        <Card key={index} variant="outlined" sx={{ minWidth: 350, textAlign: 'left' }}>
                            {edit === contact.id
                            ? <ContactEditForm index={index} contact={contact} setEdit={setEdit} contactList={contactList} setContactList={setContactList}/>
                            : <>
                                    <CardHeader 
                                        action={
                                            <>
                                                <IconButton disabled={edit !== -1} aria-label="edit" onClick={() => setEdit(contact.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(contact.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        } 
                                    />
                                    <CardContent>
                                        <div>
                                            {contact.firstName} {contact.lastName}
                                        </div>
                                        <div>
                                            Age {contact.age}
                                        </div>
                                        <div>
                                            Email: {contact.email}
                                        </div>
                                        <div>
                                            Phone #: {contact.phoneNumber}
                                        </div>
                                    </CardContent>
                                </>
                            }
                        </Card>
                    )
                })}
                <Card key='create'>
                    { createMode
                        ? <CardContent>
                            <ContactCreateForm setCreateMode={setCreateMode} contactList={contactList} setContactList={setContactList} />
                        </CardContent>
                        : <CardActionArea onClick={() => setCreateMode(true)}>
                            <Typography variant="h5" sx={{alignContent: 'center'}}>
                                <AddCircleOutlineIcon /> <b>New contact</b>
                            </Typography>
                        </CardActionArea>
                    }
                </Card>
            </Stack>
        </Box>
    );
}