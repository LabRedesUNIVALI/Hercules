import React, { Component } from 'react';
import './admin-container.css'

import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

class AdminContainer extends Component {
    render() {
        return (
            <div>
                <Sidenav />
                <div className="admin-container-content">
                    <Navbar />
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};

export default AdminContainer;
