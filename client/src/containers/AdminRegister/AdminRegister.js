import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import { register } from '../../redux/modules/auth/actionCreators';
import './admin-register.css';

class AdminRegister extends Component {

    constructor() {

        super();

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.register(this.state.user);
    }

    handleInputChange(event) {

        const { name, value } = event.target;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });

    }

    render() {

        const { user } = this.state;

        return (
            <div className="admin-register-wrapper">
                <Card>
                    <CardTitle title="Hercules" subtitle="Crie sua conta"/>
                    <div className="admin-register-form">
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="name"
                                floatingLabelText="Nome completo"
                                fullWidth
                                type="text"
                                value={user.name}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                name="email"
                                floatingLabelText="E-mail"
                                fullWidth
                                type="email"
                                value={user.email}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                name="password"
                                floatingLabelText="Senha"
                                fullWidth
                                type="password"
                                value={user.password}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                name="confirmPassword"
                                floatingLabelText="Confirme sua senha"
                                fullWidth
                                type="password"
                            />
                            <div className="admin-register-actions">
                                <RaisedButton
                                    type="submit"
                                    label="Cadastrar"
                                    primary
                                    icon={<SendIcon />}
                                    className="admin-register-button submit"
                                />
                                <Link to="/admin/register">
                                    <FlatButton
                                        label="Fazer login"
                                        primary
                                        className="admin-register-button"
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
    { register: (user) => register(user) }
)(AdminRegister);
