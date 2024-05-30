import React, { useState } from "react";
import { push } from "firebase/database";
import { assignmentsRef } from "../utils/FirebaseConfig.js";

function CreateAssignment({ userDepartment, isAdmin, username }) {
    let assignment = "";
    let department = (isAdmin ? "" : userDepartment)

    function handleInputChange(event) {
        assignment = event.target.value;
    }

    function handleSelectChange(event) {
        department = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!assignment || (!department && isAdmin)) {
            alert("Please provide assignment name and department.");
            return;
        }
        event.target.reset();
        push(assignmentsRef, {
            assignedBy: username,
            assignment: assignment,
            department: department,
            assignedTo: "none",
            status: "todo"
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input onChange={handleInputChange} type="text" id="assignmentText" placeholder="Create Assignment..." />
                {isAdmin ? (
                    <select onChange={handleSelectChange} name="department" id="department">
                        <option value="">--Please Choose A Department--</option>
                        <option value="Bratwurst Dept.">Bratwurst Dept.</option>
                        <option value="Chorizo Dept.">Chorizo Dept.</option>
                        <option value="Falukorv Dept.">Falukorv Dept.</option>
                    </select>
                ) : (
                    <input type="hidden" value={userDepartment} />
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateAssignment;
