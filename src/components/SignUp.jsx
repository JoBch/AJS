import React, { useState } from "react";
import { push } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, usersRef } from "../utils/FirebaseConfig.js";

const SignUp = () => {
    const [error, setError] = useState(null);
    let username = "";
    let department = "";
    let email = "";
    let password = "";

    function handleUsername(event) {
        username = event.target.value;
    }

    function handleSelectChange(event) {
        department = event.target.value;
    }

    function handleEmail(event) {
        email = event.target.value;
    }

    function handlePassword(event) {
        password = event.target.value;
    }

    function signUpUserInfo() {
        push(usersRef, {
            username: username,
            department: department,
            email: email
        });
    }

    async function handleSignUp(event) {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            signUpUserInfo();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input type="email" onChange={(event) => handleEmail(event)} placeholder="Email" required />
                <input type="password" onChange={(event) => handlePassword(event)} placeholder="Password" required />
                <input type="text" onChange={(event) => handleUsername(event)} placeholder="Username" />
                <select onChange={handleSelectChange} name="department" id="department">
                    <option value="">What is you favourite sausage?</option>
                    <option value="Bratwurst Dept.">Bratwurst</option>
                    <option value="Chorizo Dept.">Chorizo</option>
                    <option value="Falukorv Dept.">Falukorv</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
