import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const ThemeForm = ({
    open,
    theme,
    onInputChange,
    onClickCancel,
    onClickSubmit
}) => {
    const actions = [
        <FlatButton label="Cancelar" primary onTouchTap={onClickCancel} />,
        <RaisedButton
            label="Salvar"
            primary
            type="submit"
            style={{ marginLeft: '5px' }}
            onTouchTap={onClickSubmit}
        />
    ];
    return (
        <Dialog
            modal={true}
            title="Adicionar novo conteúdo"
            open={open}
            actions={actions}
            contentStyle={{ width: '40%' }}
        >
            <form>
                <TextField
                    floatingLabelText="Nome"
                    fullWidth
                    type="text"
                    name="name"
                    value={theme.name}
                    onChange={e => onInputChange(e)}
                />
            </form>
        </Dialog>
    );
};

export default ThemeForm;
