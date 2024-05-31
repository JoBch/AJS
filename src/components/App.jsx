//Might have to do a cleanup and move everything down 1 notch, might be too much in this component.

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
    // const [currentUser, setCurrentUser] = useState({
    //     username: "",
    //     userDepartment:"", 
    //     isAdmin: false
    // })
    const [username, setUsername] = useState(""); //Slå samman med den nedanför kanske? Och eventuellt isAdmin med?
    const [userDepartment, setUserDepartment] = useState(""); // const [currentUser, setCurrentUser] = useState({username: blabla, userDepartment: blabla})
    const [cards, setCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchAssignment();
                fetchUsers(user.email);
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

    function fetchUsers(userId) {
        onValue(usersRef, snapshot => {
            const data = snapshot.val();
            if (!data) setError("No data available from Firebase");
            const fetchedUsers = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            const loggedinUser = fetchedUsers.find(user => user.email === userId);
            if (loggedinUser) {
                setUserDepartment(loggedinUser.department);
                setUsername(loggedinUser.username)
                // setCurrentUser({
                //     ...currentUser,
                //     username: loggedinUser.username,
                //     userDepartment: loggedinUser.department
                // })
            }
            setUsers(fetchedUsers);
        });
    }

    if (user) {
        // if(userDepartment === "Admin") setCurrentUser({...currentUser, isAdmin: true})

        const isAdmin = userDepartment === "Admin";
        const filteredCards = isAdmin ? cards : cards.filter(card => card.department === userDepartment);

        return (
            <>
                <h3>Logged in as: {username}</h3>
                <LogoutButton setUser={setUser} setUsername={setUsername} />
                <CreateAssignment cards={cards} userDepartment={userDepartment} isAdmin={isAdmin} username={username} />
                {error && <p>{error}</p>}
                <div className="container">
                    <SCRUMColumn title="To Do" cards={filteredCards.filter(card => card.status === "todo")} users={users} userDepartment={userDepartment} isAdmin={isAdmin} />
                    <SCRUMColumn title="In Progress" cards={filteredCards.filter(card => card.status === "assigned")} users={users} userDepartment={userDepartment} isAdmin={isAdmin} />
                    <SCRUMColumn title="Done" cards={filteredCards.filter(card => card.status === "done")} users={users} userDepartment={userDepartment} isAdmin={isAdmin} />
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
                <Route path='/SCRUM' element={<SCRUMColumn />} />
            </Routes>
        </HashRouter>
    );
}