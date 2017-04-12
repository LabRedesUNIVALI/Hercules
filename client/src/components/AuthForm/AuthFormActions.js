import React from 'react';

const AuthFormActions = ({ children }) => {
    return (
        <div className="auth-form-actions">
            {children}
            <div className="clearfix" />
        </div>
    );
};

export default AuthFormActions;
