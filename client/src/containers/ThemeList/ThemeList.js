import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import CardTable, {
    CardTableActions
} from '../../components/CardTable';
import { fetchThemes } from '../../redux/modules/themes/actionCreators';

class ThemeList extends Component {

    componentWillMount() {
        this.props.fetchThemes();
    }

    renderRow(item) {
        return (
            <TableRow key={item._id}>
                <TableRowColumn>
                    {item._id}
                </TableRowColumn>
                <TableRowColumn>
                    {item.name}
                </TableRowColumn>
                <TableRowColumn>
                    <IconMenu
                        style={{ float: 'right' }}
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                        <MenuItem primaryText="Editar" />
                        <MenuItem primaryText="Excluir" />
                    </IconMenu>
                </TableRowColumn>
            </TableRow>
        );
    }

    render() {

        const { themes } = this.props;

        return (
            <CardTable>
                <CardTableActions>
                    <RaisedButton
                        label="Novo conteúdo"
                        primary
                        style={{ float: 'right' }}
                    />
                </CardTableActions>
                <Table
                    selectable={false}
                    showCheckboxes={false}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        className="card-table-header">
                        <TableRow>
                            <TableHeaderColumn className="card-table-th">
                                Código
                            </TableHeaderColumn>
                            <TableHeaderColumn className="card-table-th">
                                Nome
                            </TableHeaderColumn>
                            <TableHeaderColumn />
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        {themes && themes.map(this.renderRow)}
                    </TableBody>
                </Table>
            </CardTable>
        );
    }

}

const mapStateToProps = (state) => ({
    themes: state.themes.items
});

const mapDispatchToProps = (dispatch) => ({
    fetchThemes: () => dispatch(fetchThemes())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemeList);
