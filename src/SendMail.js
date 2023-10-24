import React from 'react'
import "./SendMail.css"
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closedSendMessage } from './features/mailSlice';
import { db } from './firebase';
import { collection, serverTimestamp } from "firebase/firestore";
import { addDoc } from 'firebase/firestore';


function SendMail() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        addDoc(collection(db, "emails"), {
            to:formData.to,
            subject:formData.subject,
            message:formData.message,
            timestamp: serverTimestamp(), 
        });
    }
    const dispatch = useDispatch();

  return (
    <div className="sendMail">
        <div className="sendMail__header">
            <h3>New Message</h3>
            <CloseIcon 
            className="sendMail__close"
            onClick={() => dispatch(closedSendMessage())}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input  
            placeholder="To" 
            type="email" 
            {...register("to", { required: true })} 
            />
            {errors.to && <p className="sendMail__error">To is Required!</p>}

            <input 
            placeholder="Subject" 
            type="text" 
            {...register("subject", { required: true })}
            />
            {errors.subject && <p className="sendMail__error">Subject is Required!</p>}

            <input 
            placeholder="Message..." 
            type="text" 
            className="sendMail__message" 
            {...register("message", { required: true })}
            />
            {errors.message && <p className="sendMail__error">Message is Required!</p>}

            <div className="sendMail__options">
                <Button 
                className="sendMail__send"
                variant="contained"
                color="primary"
                type="submit"
                >
                    Send
                </Button>
            </div>
        </form>
    </div>
  )
}

export default SendMail