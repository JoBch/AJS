import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './Signup.jsx';
import CreateAssignment from "./CreateAssignmentForm";
import SCRUMColumn from "./SCRUMColumns.jsx";
import { assignmentsRef, auth, usersRef } from "../utils/FirebaseConfig.js";
import { onValue } from "firebase/database";
import LogoutButton from './Logout.jsx';

export function App() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [userDepartment, setUserDepartment] = useState("");
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchUser(user.email);
                fetchAssignment();
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    function fetchAssignment() {
        onValue(assignmentsRef, snapshot => {
            const data = snapshot.val();
            if (!data) setError("No data available from Firebase");
            const fetchedCards = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            setCards(fetchedCards);
        });
    }

    function fetchUser(userId) {
        onValue(usersRef, snapshot => {
            const data = snapshot.val();
            if (!data) setError("No data available from Firebase");
            const fetchedUsers = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            const currentUser = fetchedUsers.find(user => user.email === userId);
            if (currentUser) {
                setUserDepartment(currentUser.department);
                setUsername(currentUser.username)
            }
        });
    }

    if (user) {
        return (
            <>
                <LogoutButton setUser={setUser} setUsername={setUsername} />
                <CreateAssignment cards={cards} userDepartment={userDepartment} username={username} />
                {error && <p>{error}</p>}
                <div className="container">
                    <SCRUMColumn title="To Do" cards={cards.filter(card => card.status === "todo")} userDepartment={userDepartment} />
                    <SCRUMColumn title="In Progress" cards={cards.filter(card => card.status === "assigned")} userDepartment={userDepartment} />
                    <SCRUMColumn title="Done" cards={cards.filter(card => card.status === "done")} userDepartment={userDepartment} />
                </div>
            </>
        );
    }

    return (
        <HashRouter>
            <div>
                <h1>Hello and welcome to everything sausage related crammed into one fine looking SCRUM-board.</h1>
                <Link to="/Login">If you already are a sausage lover, click here to login!</Link>
                <br />
                <Link to="/signup">If you want to become a sausage lover, click here!</Link>
            </div>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path='/SCRUM' element={<SCRUMColumn/> }/>
            </Routes>
        </HashRouter>
    );
}
