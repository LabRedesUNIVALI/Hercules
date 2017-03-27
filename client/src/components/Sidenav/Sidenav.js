import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import People from 'material-ui/svg-icons/social/people';
import Description from 'material-ui/svg-icons/action/description';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import Class from 'material-ui/svg-icons/action/class';

const Sidenav = () => {
    return (
        <Drawer open containerStyle={{ top: 64 }}>
            <MenuItem leftIcon={<DashboardIcon />}>Visão geral</MenuItem>
            <MenuItem leftIcon={<People />}>Disciplinas</MenuItem>
            <MenuItem leftIcon={<Class />}>Conteúdos</MenuItem>
            <MenuItem leftIcon={<QuestionAnswer />}>Questões</MenuItem>
            <MenuItem leftIcon={<Description />}>Provas</MenuItem>
        </Drawer>
    );
};

export default Sidenav;
