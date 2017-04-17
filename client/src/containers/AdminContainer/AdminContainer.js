import React, { Component } from 'react';
import { connect } from 'react-redux';
import './admin-container.css'

import { logout } from '../../redux/modules/auth/actionCreators';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

class AdminContainer extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.router.push('/admin/login');
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <Navbar onClickLogout={this.props.logout} />
                    <Sidenav />
                    <div className="admin-container-content">
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContainer);
