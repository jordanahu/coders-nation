import React, {useState} from 'react'
import { Typography, Button } from '@material-ui/core';
import Input from "../Input/Input";
import showError from "../showError/showError"
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from "react-loader-spinner";
import * as yup from "yup";
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import useAuth from "../customHooks/useAuth";

import {
     AiOutlineGoogle,
     
 } from "react-icons/ai";
 import "./style.css";



const schema = yup.object().shape({
  username:yup.string().required()
    .matches(/^([^0-9]*)$/, "name should not contain numbers!")
    ,
    email:yup.string().email("must be a valid email!")
    .required("email field is required!"),
    password: yup.string().required("This field is required")
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/[a-zA-Z0-9]/, 'Password must contain numbers and letters.'),
    passwordConfirmation: yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
        "both passwords must be the same"
      )
    })
})




const Home = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {signup, setUsername} = useAuth();
  const [signupErrors, setSignupErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {handleSubmit,formState:{errors}, control} = useForm({
    resolver:yupResolver(schema)
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleClickShowPassword(){
    setShowPassword(bool=>!bool);
  }

  async function onSubmit(data){
      const {email, password, username} = data;
      try{
        setLoading(true);
        setSignupErrors('');
        await signup(email, password);
        await setUsername(username);
        history.push("/dashboard");
      }catch(e){
        setSignupErrors("Failed to create account!");
        setOpen(true);
      }

      setLoading(false)
  }
 

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    return (
     <div className="home">
       <div className="welcome">
          <Typography variant="h3" className="title">Welcome To<br/> CodersNation</Typography>
          <Typography className="hasAccount" >Already have an account?</Typography>
          <Button
          component={Link} to="/login"
           className="signin">Sign In</Button>
       </div>

       <div className="signup">
         <Typography variant="h3" className="signup__title">SIGN UP</Typography>
          {signupErrors && showError(
            signupErrors,open,handleClose
          )}
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Input
                error={!!errors?.username}
                helperText={errors?.username?.message}
                control={control}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className="icon" />
                    </InputAdornment>
                  ),
                }}
                placeholder="username" name="username"/> 
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
              
                <Input placeholder="confirm password" name="passwordConfirmation"
                error={!!errors?.passwordConfirmation}
                helperText={errors?.passwordConfirmation?.message}
                control={control}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className="icon" />
                  </InputAdornment>
                }
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
                  ),
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
           <Button type="submit" className="submitBtn">SIGN UP</Button>}
          </form>
          <Typography style={{fontWeight:"bold"}} paragraph>Or sign in with social platforms</Typography>
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
       </div>
     </div>
      
    );
}

export default Home
