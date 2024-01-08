import { useContext } from 'react';
import Booking from './Booking';
import { UserContext } from '../../UserContext';
import LoginPage from '../auth/LoginPage';

const Index = () => {
    const { user } = useContext(UserContext) || { user: {} };

    return (
        <div>
            {user?.type === false ? (
                <Booking />
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default Index;
