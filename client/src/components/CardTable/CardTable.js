import React from 'react';
import { Card } from 'material-ui/Card';

const CardTable = ({ children }) => {
    return (
        <Card>
            {children}
        </Card>
    );
};

export default CardTable;
