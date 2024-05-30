import React from "react";
import AssignmentCard from "./AssignmentCard";

function SCRUMColumn({ title, cards }) {
    return (
        <div className="column">
            <h2>{title}</h2>
            {cards.map(card => (
                <AssignmentCard key={card.id} card={card} />
            ))}
        </div>
    );
}

export default SCRUMColumn;
