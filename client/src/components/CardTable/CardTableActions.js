import React from 'react';

const CardTableActions = ({ children }) => {
    return (
        <div className="card-table-actions">
            {children}
            <div className="clearfix" />
        </div>
    );
};

export default CardTableActions;
