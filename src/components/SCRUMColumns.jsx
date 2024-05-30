import React from 'react';
import AssignmentCard from './AssignmentCard.jsx';

function SCRUMColumn({ title, cards, users, userDepartment, isAdmin }) {
    return (
        <div className="column">
            <h2>{title}</h2>
            {cards.map(card => (
                <AssignmentCard key={card.id} card={card} users={users} userDepartment={userDepartment} isAdmin={isAdmin} />
            ))}
        </div>
    );
}

export default SCRUMColumn;
