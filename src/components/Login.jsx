import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig.js";

function Login() {
    const [error, setError] = useState(null);

    let email = "";
    let password = "";

    function handleEmail(event) {
        email = event.target.value;
    }

    function handlePassword(event) {
        password = event.target.value;
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <input type="email" onChange={(event) => handleEmail(event)} placeholder="Email" required />
                <input type="password" onChange={(event) => handlePassword(event)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
