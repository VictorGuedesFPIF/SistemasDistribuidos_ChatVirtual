import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import Splash from '../../pages/Splash';
import AuthLayout from './AuthLayout';

const AuthWrapper = ({ auth, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/chat');
        }
    }, [auth.isAuthenticated, navigate]);

    if (auth.loading) {
        return (
            <AuthLayout>
                <Splash />
            </AuthLayout>
        );
    }

    if (!auth.isAuthenticated) {
        return (
            <AuthLayout>
                <Auth />
            </AuthLayout>
        );
    }

    return children;
};

const mapStateToProps = (state) => ({
    auth: state.App.auth
});

export default connect(mapStateToProps)(AuthWrapper);