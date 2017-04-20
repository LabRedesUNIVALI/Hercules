import React from 'react';
import { TableHeader } from 'material-ui/Table';

const CardTableHeader = ({ children }) => {
    return (
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {children}
        </TableHeader>
    );
};

export default CardTableHeader;
