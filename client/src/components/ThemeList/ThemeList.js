import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import CardTable, { CardTableActions } from '../../components/CardTable';

const ThemeList = ({ themes, onClickAdd }) => {
    const renderRow = item => {
        return (
            <TableRow key={item._id}>
                <TableRowColumn>
                    {item.name}
                </TableRowColumn>
                <TableRowColumn style={{ paddingRight: 0 }}>
                    <IconMenu
                        style={{ float: 'right' }}
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <MenuItem primaryText="Editar" />
                        <MenuItem primaryText="Excluir" />
                    </IconMenu>
                </TableRowColumn>
            </TableRow>
        );
    };

    return (
        <CardTable>
            <CardTableActions>
                <RaisedButton
                    label="Novo conteúdo"
                    onTouchTap={onClickAdd}
                    primary
                    style={{ float: 'right' }}
                />
            </CardTableActions>
            <Table selectable={false} showCheckboxes={false}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    className="card-table-header"
                >
                    <TableRow>
                        <TableHeaderColumn className="card-table-th">
                            Nome
                        </TableHeaderColumn>
                        <TableHeaderColumn />
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {themes && themes.map(renderRow)}
                </TableBody>
            </Table>
        </CardTable>
    );
};

export default ThemeList;
