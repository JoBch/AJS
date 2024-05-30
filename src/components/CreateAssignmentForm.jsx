import React from "react";
import { push } from "firebase/database";
import { assignmentsRef } from "../utils/FirebaseConfig.js";

function CreateAssignment({ userDepartment, username }) {
    let assignment = "";

    function handleInputChange(event) {
        assignment = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.target.reset();

        if (!assignment || !userDepartment) {
            alert("Please provide assignment name and department.");
            return;
        }

        push(assignmentsRef, {
            assignment: assignment,
            department: userDepartment,
            assignedBy: username,
            assignedTo: "none",
            status: "todo"
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleInputChange} type="text" id="assignmentText" placeholder="Create Assignment..." />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateAssignment;
