import React, {useState} from 'react'
import { Typography, Button } from '@material-ui/core';
import Input from "../Input/Input";
import EmailIcon from '@material-ui/icons/Email';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputAdornment from '@material-ui/core/InputAdornment';
import {useForm} from "react-hook-form";
import CssBaseline from '@material-ui/core/CssBaseline';
import Swal from 'sweetalert2'
import useAuth from "../customHooks/useAuth";
import showError from "../showError/showError";
import "./style.css";



const schema = yup.object().shape({
    email:yup.string().email("must be a valid email!")
    .required("email field is required!")
      
  })
  

const Reset = () => {
    const {resetPassword} = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetError, setResetError] = useState("");
    const {handleSubmit,formState:{errors}, control} = useForm({
      resolver:yupResolver(schema)
    });

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    async function onSubmit(data){
        const {email} = data;
        try{
          setLoading(true);
          setResetError("");
          await resetPassword(email);
          Swal.fire("Sent!", "Check your inbox for further instructions!", "success");

        }catch(err){
          setResetError("invalid email!");
          setOpen(true);
        }
        setLoading(false)
    }



    return (
        <div className="login">
            <CssBaseline/>
            {resetError && showError(resetError, open, handleClose)}
            <Typography variant="h3" className="signin__title">RESET PASSWORD</Typography>
             <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Input
                error={!!errors?.email}
                helperText={errors?.email?.message}
                control={control}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="icon" />
                    </InputAdornment>
                  ),
                }}
                placeholder="email" name="email"/>           
           
           <Button disabled={loading} type="submit" className="submitBtn">RESET</Button>
          </form>
         
       </div>
       
           
    )
}

export default Reset
