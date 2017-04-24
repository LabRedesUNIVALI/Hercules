import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThemeList from '../../components/ThemeList';
import ThemeForm from '../../components/ThemeForm';
import {
    fetchThemes,
    createTheme
} from '../../redux/modules/themes/actionCreators';

class ThemesPage extends Component {
    constructor() {
        super();
        this.state = {
            theme: { name: '' },
            dialogOpen: false
        };
        this.openFormDialog = this.openFormDialog.bind(this);
        this.closeFormDialog = this.closeFormDialog.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openFormDialog() {
        this.setState({ dialogOpen: true });
    }

    closeFormDialog() {
        this.setState({ dialogOpen: false });
    }

    componentWillMount() {
        this.props.fetchThemes();
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        this.setState({
            theme: {
                ...this.state.theme,
                [name]: value
            }
        });
    }

    handleSubmit() {
        this.props.createTheme(this.state.theme);
        this.closeFormDialog();
    }

    render() {
        const { theme, dialogOpen } = this.state;
        return (
            <div>
                <ThemeList
                    themes={this.props.themes}
                    onClickAdd={this.openFormDialog}
                />
                <ThemeForm
                    theme={theme}
                    open={dialogOpen}
                    onClickCancel={this.closeFormDialog}
                    onInputChange={this.handleInputChange}
                    onClickSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    themes: state.themes.items
});

const mapDispatchToProps = dispatch => ({
    fetchThemes: () => dispatch(fetchThemes()),
    createTheme: theme => dispatch(createTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemesPage);
