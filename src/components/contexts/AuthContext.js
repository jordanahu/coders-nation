import React, {createContext, useState, useEffect} from 'react';
import {auth} from "../firebaseConfig/firebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(auth.getAuth(),email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(auth.getAuth(),email, password);
    }

    function signout(){
        return auth.signOut(auth.getAuth());
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(auth.getAuth(),email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(auth.getAuth(),email);
    }

    function updatePassword(password){
        return currentUser.updatePassword(auth.getAuth(),password)
    }

    function setUsername(username){
        return auth.updateProfile(auth.getAuth().currentUser,
                                   {displayName:username})
    }

    useEffect(()=>{
        
        const unsubscribe = auth.onAuthStateChanged(auth.getAuth() ,user=>{
            setCurrentUser(user);
            setLoading(false);
        });
        
        return unsubscribe;
    },[])
    const value = {
        currentUser,
        signup,
        login,
        signout,
        resetPassword,
        updateEmail,
        updatePassword,
        setUsername,
    }
    return (
       <>
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
       </>
    )
}

export default AuthProvider
