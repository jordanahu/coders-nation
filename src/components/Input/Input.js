import React from 'react';
import {Controller } from "react-hook-form";
import { TextField} from "@material-ui/core";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));




const Input = ({name, control, placeholder,helperText,error, type, InputProps}) => {
    const classes = useStyles();
    
    return (
        <>
         <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField 
        style={{backgroundColor:"rgba(255,255,255,0.4", 
      
        }}
        {...{helperText, error, InputProps}}
        // InputProps={InputProps}
        className={classes.margin}
        type={type}
        InputLabelProps={{style:{color:"rgba( 89, 149, 253, 0.95 )",fontWeight:"bold"}}}
         label={placeholder} variant="filled" {...field} />}
      />
            
        </>
    )
}


export default Input
