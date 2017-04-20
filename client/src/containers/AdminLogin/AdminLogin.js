import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import Topbar from '../../components/Topbar';
import AuthForm, { AuthFormActions } from '../../components/AuthForm';
import { login } from '../../redux/modules/auth/actionCreators';

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
            <div>
                <Topbar />
                <AuthForm
                    title="Hercules"
                    subtitle="Faça seu login no Hercules"
                >
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
                        <AuthFormActions>
                            <RaisedButton
                                label="Entrar"
                                primary
                                icon={<SendIcon />}
                                type="submit"
                                style={{ float: 'right', marginLeft: '5px' }}
                            />
                            <Link to="/admin/register">
                                <FlatButton
                                    label="Criar conta"
                                    primary
                                    className="admin-login-button"
                                    style={{ float: 'right' }}
                                />
                            </Link>
                        </AuthFormActions>
                    </form>
                </AuthForm>
            </div>
        );
    }
}

export default connect(null, { login: credentials => login(credentials) })(
    AdminLogin
);
