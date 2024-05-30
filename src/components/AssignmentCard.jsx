import { db } from "../utils/FirebaseConfig";
import { ref, update, remove } from "firebase/database";

function AssignmentCard({ card }) {

    const firebaseRef = "/assignments/";
    let intputText = "";

    function handleInputChange(event) {
        intputText = event.target.value
    }

    async function handleSubmit(event, cardId) {
        event.preventDefault();
        await update(ref(db, firebaseRef + cardId), {
            status: "assigned",
            assignedTo: intputText
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
    //Building my cards based on what their status are, also adding the functionality to move them along the SCRUM-board
    return (
        <div className="card">
            <h3>{card.assignment}</h3>
            <p>{card.department}</p>
            <p>Assigned by: {card.assignedBy}</p>
            {card.status === "todo" && (
                <form onSubmit={(event) => handleSubmit(event, card.id)}>
                    <input required type="text" id="assignedTo" onChange={handleInputChange} placeholder="Who should do it..." />
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