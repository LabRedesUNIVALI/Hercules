import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

import HomeIcon from 'material-ui/svg-icons/action/home';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import ClassIcon from 'material-ui/svg-icons/action/class';

import './sidenav.css';

const Sidenav = () => {
    return (
        <Drawer open zDepth={0} containerClassName="sidenav-container">
            <div className="sidenav-items">
                <Link to="/admin">
                    <MenuItem leftIcon={<HomeIcon />}>Visão geral</MenuItem>
                </Link>
                <Link to="/admin/disciplines">
                    <MenuItem leftIcon={<PeopleIcon />}>Disciplinas</MenuItem>
                </Link>
                <Link to="/admin/themes">
                    <MenuItem leftIcon={<ClassIcon />}>Conteúdos</MenuItem>
                </Link>
                <Link to="/admin/questions">
                    <MenuItem leftIcon={<QuestionAnswerIcon />}>
                        Questões
                    </MenuItem>
                </Link>
                <Link to="/admin/tests">
                    <MenuItem leftIcon={<DescriptionIcon />}>Provas</MenuItem>
                </Link>
            </div>
        </Drawer>
    );
};

export default Sidenav;
