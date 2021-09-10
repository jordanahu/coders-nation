import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import "./style.css";


const showError = (message,open, handleClose, vertical="top") => {

return (
  <Snackbar
      anchorOrigin={{ vertical, horizontal:"center" }}
      open={open}
      onClose={handleClose}
      message={message}
      autoHideDuration={4000}
      ContentProps={{
        "aria-describedby": "message-id",
        className: "snackbar"
      }}
      key="topcenter"
    />
)

  // return function showError(){

  //   return (
  //     <CustomSnackbar
  //     message={signupErrors}
  //     open={open}
  //     handleClose={handleClose}
  //     />
  //   )
  // }
    // return (
    //     <Snackbar
    //   anchorOrigin={{ vertical:"top", horizontal:"center" }}
    //   open={open}
    //   onClose={handleClose}
    //   message={message}
    //   autoHideDuration={4000}
    //   ContentProps={{
    //     "aria-describedby": "message-id",
    //     className: "snackbar"
    //   }}
    //   key="topcenter"
    // />
    // )
}

export default showError
