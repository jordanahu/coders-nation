import React, {useState} from 'react'
import useAuth from "../customHooks/useAuth";
import { Typography, Button } from '@material-ui/core';
import showError from "../showError/showError";
import {useHistory} from "react-router-dom";
import Loader from "react-loader-spinner";
import "./style.css";


const Dashboard = () => {

    const {currentUser, signout} = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [signoutErrors, setSignoutErrors] = useState('');


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false)
    }

    async function handleSignout(){

        try{
            setLoading(true);
            setSignoutErrors("");
            await signout()
            history.push("/");
        }catch(err){
            setSignoutErrors("error signing out!");
            setOpen(true);
        }
        setLoading(false);
    }

    return (
        <div className="dashboard">
             {signoutErrors && showError(
            signoutErrors,open,handleClose
          )}
            <Typography variant="h4">
                welcome {currentUser.displayName}, to Coders Nation.
            </Typography>
            
            {
                loading
                 ?
                 <Loader 
                 type="Circles" 
                 color="rgba( 89, 149, 253, 0.95 ) " 
                 height={45} 
                 width={45}/>
              :
                <Button disabled={loading} className="signout" onClick={handleSignout}>SIGN OUT</Button>}
        </div>
    )
}

export default Dashboard
