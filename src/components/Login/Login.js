import React, {useState} from 'react'
import { Typography, Button } from '@material-ui/core';
import Input from "../Input/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import showError from "../showError/showError";
import Loader from "react-loader-spinner";
import * as yup from "yup";
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import {AiOutlineGoogle} from "react-icons/ai";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import useAuth from "../customHooks/useAuth";

import "./style.css";



const schema = yup.object().shape({
      password: yup.string().required("This field is required"),
      email:yup.string().email("must be a valid email!")
    .required("email field is required!"),
      
     
  })
  

const Login = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {handleSubmit,formState:{errors}, control} = useForm({
      resolver:yupResolver(schema)
    });
  
    function handleClickShowPassword(){
      setShowPassword(bool=>!bool);
    }
  
    async function onSubmit(data){
        
      const {email, password} = data;
        
        try{
          setLoginError("");
          setLoading(true);

          await login(email, password);

          history.push("/dashboard");
        }catch(e){
          setLoginError("Invalid credentials!");
          setOpen(true);
        }
        
        setLoading(false);
    }



    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    return (
        <div className="login">
            <CssBaseline/>
            {loginError && showError(
                loginError,open,handleClose, "bottom"
            )}
            <Typography variant="h3" className="signin__title">SIGN IN</Typography>
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
                <Input 
                error={!!errors?.password}
                helperText={errors?.password?.message}
                control={control}
                placeholder="password" name="password"
             
                type={showPassword ? "text": "password"}
                InputProps={{ 
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility className="icon" />
                         : <VisibilityOff className="icon" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="icon" />
                    </InputAdornment>
                  )
                }}
                />
              
              {
              loading
                 ?
                 <Loader 
                 type="Circles" 
                 color="rgba( 89, 149, 253, 0.95 ) " 
                 height={45} 
                 width={45}/>
                 :
           <Button type="submit" className="submitBtn">SIGN IN</Button>}
          </form>
          <Link to="/reset" 
           className="reset">
            Forgot password?</Link>
          <Typography 
          style={{fontWeight:"bold", textAlign:"center"}} paragraph>
            Or sign in with social platforms</Typography>
          <div className="social-platforms">
            <Button
            variant="outlined"
            style={{margin:"0.5em", fontWeight:"bold"}}
            startIcon={<AiOutlineGoogle className="icon"/>}
            >Google</Button>
            <Button
            variant="outlined"
            style={{margin:"0.5em", fontWeight:"bold"}}
            startIcon={<TwitterIcon className="icon"/>}
            >Twitter</Button>
            <Button
            variant="outlined"
            style={{margin:"0.5em", fontWeight:"bold"}}
            startIcon={<FacebookIcon className="icon"/>}
            >Facebook</Button>
            <Button
            variant="outlined"
            style={{margin:"0.5em", fontWeight:"bold"}}
            startIcon={<InstagramIcon className="icon"/>}
            >Instagram</Button>
          </div>
          <br/>
          <Typography 
          style={{fontWeight:"bold", textAlign:"center"}} paragraph>
            Don't have an account? <Link to="/">Sign up</Link></Typography>
       </div>
       
           
    )
}

export default Login
