import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThemeList from '../../components/ThemeList';
import { fetchThemes } from '../../redux/modules/themes/actionCreators';

class ThemesPage extends Component {
    componentWillMount() {
        this.props.fetchThemes();
    }

    render() {
        return <ThemeList themes={this.props.themes} />;
    }
}

const mapStateToProps = state => ({
    themes: state.themes.items
});

const mapDispatchToProps = dispatch => ({
    fetchThemes: () => dispatch(fetchThemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemesPage);
