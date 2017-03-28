import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import HomeIcon from 'material-ui/svg-icons/action/home';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import ClassIcon from 'material-ui/svg-icons/action/class';

import './sidenav.css';

const Sidenav = () => {
    return (
        <Drawer
            open={true}
            zDepth={0}
            containerClassName="sidenav-container">
            <div className="sidenav-header">
            </div>
            <div className="sidenav-items">
                <MenuItem leftIcon={<HomeIcon />}>Visão geral</MenuItem>
                <MenuItem leftIcon={<PeopleIcon />}>Disciplinas</MenuItem>
                <MenuItem leftIcon={<ClassIcon />}>Conteúdos</MenuItem>
                <MenuItem leftIcon={<QuestionAnswerIcon />}>Questões</MenuItem>
                <MenuItem leftIcon={<DescriptionIcon />}>Provas</MenuItem>
            </div>
        </Drawer>
    );
};

export default Sidenav;
