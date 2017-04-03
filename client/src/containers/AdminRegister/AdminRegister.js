import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SendIcon from 'material-ui/svg-icons/content/send';

import './admin-register.css';

class AdminRegister extends Component {
    render() {
        return (
            <div className="admin-login-wrapper">
                <Card>
                    <CardTitle title="Hercules" subtitle="Autenticar-se"/>
                    <div className="admin-login-form">
                        <form>
                            <TextField
                                floatingLabelText="Nome completo"
                                fullWidth
                                type="text"
                            />
                            <TextField
                                floatingLabelText="E-mail"
                                fullWidth
                                type="email"
                            />
                            <TextField
                                floatingLabelText="Senha"
                                fullWidth
                                type="password"
                            />
                            <TextField
                                floatingLabelText="Confirme sua senha"
                                fullWidth
                                type="password"
                            />
                            <div className="admin-login-actions">
                                <RaisedButton
                                    label="Cadastrar"
                                    primary
                                    icon={<SendIcon />}
                                    style={{ float: 'right', marginLeft: '5px' }}
                                />
                                <Link to="/admin/login">
                                    <FlatButton
                                        label="Fazer login"
                                        primary 
                                        className="button"
                                        style={{ float: 'right' }}                  
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

export default AdminRegister
