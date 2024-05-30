import React from "react";
import AssignmentCard from "./AssignmentCard";

function SCRUMColumn({ title, cards, userDepartment }) {
    const filteredCards = cards.filter(card => card.department === userDepartment);

    return (
        <div className="column">
            <h2>{title}</h2>
            {filteredCards.map(card => (
                <AssignmentCard key={card.id} card={card} />
            ))}
        </div>
    );
}

export default SCRUMColumn;
