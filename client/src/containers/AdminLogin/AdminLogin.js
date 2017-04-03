import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import * as authActions from '../../redux/modules/auth/actionCreators'
import './admin-login.css';

class AdminLogin extends Component {

    constructor() {

        super();

        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.credentials);
    }

    handleInputChange(event) {

        const { value, name } = event.target;

        this.setState({
            credentials: {
                ...this.state.credentials,
                [name]: value
            }
        });

    }

    render() {

        const { credentials } = this.state;

        return (
            <div className="admin-login-wrapper">
                <Card zDepth={2}>
                    <CardTitle title="Hercules" subtitle="Autenticar-se"/>
                    <div className="admin-login-form">
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                floatingLabelText="E-mail"
                                fullWidth
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                floatingLabelText="Senha"
                                fullWidth
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={this.handleInputChange}
                            />
                            <div className="admin-login-actions">
                                <RaisedButton
                                    label="Entrar"
                                    primary
                                    icon={<SendIcon />}
                                    type="submit"
                                    className="admin-login-button submit"
                                />
                                <Link to="/admin/register">
                                    <FlatButton
                                        label="Criar conta"
                                        primary
                                        className="admin-login-button"
                                    />
                                </Link>
                                <div className="clearfix" />
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        );
    }

}

export default connect(
    null,
    { login: (credentials) => authActions.login(credentials) }
)(AdminLogin);
