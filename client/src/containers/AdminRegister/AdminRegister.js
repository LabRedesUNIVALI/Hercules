import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import Topbar from '../../components/Topbar';
import AuthForm, { AuthFormActions } from '../../components/AuthForm';
import { register } from '../../redux/modules/auth/actionCreators';

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
            <div>
                <Topbar />
                <AuthForm
                    title="Hercules"
                    subtitle="Cadastre-se já no Hercules!">
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
                        <AuthFormActions>
                            <RaisedButton
                                type="submit"
                                label="Cadastrar"
                                primary
                                icon={<SendIcon />}
                                style={{ float: 'right', marginLeft: '5px' }}
                            />
                            <Link to="/admin/login">
                                <FlatButton
                                    label="Fazer login"
                                    primary
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

export default connect(
    null,
    { register: (user) => register(user) }
)(AdminRegister);
