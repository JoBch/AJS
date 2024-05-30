import { db } from "../utils/FirebaseConfig";
import { ref, update, remove } from "firebase/database";
import React, { useState } from "react";

function AssignmentCard({ card, users, userDepartment, isAdmin }) {
    const firebaseRef = "/assignments/";
    const [assignedTo, setAssignedTo] = useState("");

    function handleAssignedToChange(event) {
        setAssignedTo(event.target.value);
    }

    async function handleSubmit(event, cardId) {
        event.preventDefault();
        await update(ref(db, firebaseRef + cardId), {
            status: "assigned",
            assignedTo: assignedTo
        });
    }

    async function handleTaskDone(event, cardId) {
        event.preventDefault();
        await update(ref(db, firebaseRef + cardId), {
            status: "done"
        });
    }

    async function handleDeleteTask(event, cardId) {
        event.preventDefault();
        await remove(ref(db, firebaseRef + cardId));
    }

    const filteredUsers = isAdmin ? users : users.filter(user => user.department === userDepartment);

    return (
        <div className="card">
            <h3>{card.assignment}</h3>
            <p>{card.department}</p>
            <p>Assigned by: {card.assignedBy}</p>
            {card.status === "todo" && (
                <form onSubmit={(event) => handleSubmit(event, card.id)}>
                    <select onChange={handleAssignedToChange} name="assignedTo" id="assignedTo" required>
                        <option value="">--Select User--</option>
                        {filteredUsers.map(user => (
                            <option key={user.id} value={user.username}>{user.username}</option>
                        ))}
                    </select>
                    <button type="submit">Assign</button>
                </form>
            )}
            {card.status === "assigned" && (
                <>
                    <p>Assigned to: {card.assignedTo}</p>
                    <button onClick={(event) => handleTaskDone(event, card.id)}>Task Done</button>
                </>
            )}
            {card.status === "done" && (
                <>
                    <p>Assigned to: {card.assignedTo}</p>
                    <button onClick={(event) => handleDeleteTask(event, card.id)}>Delete Task</button>
                </>
            )}
        </div>
    );
}

export default AssignmentCard;
