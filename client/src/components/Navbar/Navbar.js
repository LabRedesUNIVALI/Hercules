import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import PersonIcon from 'material-ui/svg-icons/social/person';

const Navbar = () => {

    const renderMenu = () => {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem primaryText="Meus dados" rightIcon={<PersonIcon />} />
                <MenuItem primaryText="Sair" rightIcon={<ExitToAppIcon />} />
            </IconMenu>
        );
    }

    return (
        <AppBar
            title="Hercules"
            zDepth={2}
            iconElementRight={renderMenu()}
        />
    );
}

export default Navbar;
