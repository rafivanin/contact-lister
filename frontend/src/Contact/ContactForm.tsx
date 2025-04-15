import { Control, Controller, FieldErrors, SubmitErrorHandler, SubmitHandler, UseFormHandleSubmit } from "react-hook-form"
import { ContactInput } from "../util"
import { TextField } from "@mui/material";

interface ContactFormProps {
    control: Control<ContactInput, any>;
    handleSubmit: UseFormHandleSubmit<ContactInput, any>;
    onSubmit: SubmitHandler<ContactInput>;
    errors: FieldErrors<ContactInput>;
    isEdit?: boolean;
}

export default function ContactForm ({ control, handleSubmit, onSubmit, errors, isEdit }: ContactFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
                <Controller
                    name="firstName"
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => 
                        <TextField 
                            required
                            {...field}
                            error={!!errors.firstName}
                            size='small' 
                            label="First Name"
                            sx={{paddingLeft: 0.5, paddingRight: 0.5}} 
                        />
                    }
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => 
                        <TextField 
                            required
                            {...field}
                            error={!!errors.lastName}
                            size='small' 
                            label="Last Name"
                            sx={{paddingLeft: 0.5, paddingRight: 0.5}} 
                        />
                    }
                />
            </div>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    }}
                    render={({ field }) => 
                        <TextField 
                            required
                            {...field}
                            error={!!errors.email}
                            size='small' 
                            label="Email"
                            helperText={errors.email?.type === "pattern" && "Incorrect email format"}
                            sx={{paddingLeft: 0.5, paddingRight: 0.5}} 
                        />
                    }
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true, pattern: /\d{3}-\d{3}-\d{4}/ }}
                    render={({ field }) => 
                        <TextField 
                            required
                            {...field}
                            error={!!errors.phoneNumber}
                            size='small' 
                            label="Phone #" 
                            helperText="Format: xxx-xxx-xxxx" 
                            sx={{paddingLeft: 0.5, paddingRight: 0.5}} 
                        />
                    }
                />
            </div>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
                <Controller
                    name="age"
                    control={control}
                    rules={{ required: true, min: 1, max: 150 }}
                    render={({field}) => 
                        <TextField 
                            required
                            {...field}
                            error={!!errors.age}
                            type="number" 
                            size='small' 
                            label="Age"
                            helperText={
                                errors.age?.type === "min"
                                ? "Age should be greater than 0"
                                : errors.age?.type === "max"
                                ? "Age should be less than 150"
                                : "" 
                            }
                            sx={{paddingLeft: 0.5, paddingRight: 0.5}}
                        />
                    }
                />
            </div>
            <div style={{paddingTop: 5, paddingBottom: 5}}>
                <input type="submit" name="button" value={isEdit ? "Update Contact" : "Create Contact"} />
            </div>
        </form>
    )
}