import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import GithubIcon from 'material-ui/svg-icons/device/gps-fixed';

class ThemeList extends Component {
    render() {
        return (
            <div>
                <Card>
                <Table selectable={false} showCheckboxes={false}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Código</TableHeaderColumn>
                            <TableHeaderColumn>
                               Ações
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>1</TableRowColumn>
                            <TableRowColumn>
                                <IconButton>
                                    <GithubIcon />
                                </IconButton>
                                <IconButton>
                                    <GithubIcon />
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                </Card>
            </div>
        );
    }
}

export default ThemeList;
