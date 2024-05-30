import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig.js";

function LogoutButton({setUser, setUsername}){
   function handleLogout(){
        setUser(null);
        setUsername("")
        signOut(auth).catch((error) => {
            alert("Error logging out:", error);
        });
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
