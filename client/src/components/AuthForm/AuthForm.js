import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

const AuthForm = ({ children, title, subtitle }) => {
    return (
        <div className="auth-form-wrapper">
            <Card>
                <CardTitle
                    title={title}
                    subtitle={subtitle}
                />
                <div className="auth-form">
                    {children}
                </div>
            </Card>
        </div>
    );
};

export default AuthForm;
