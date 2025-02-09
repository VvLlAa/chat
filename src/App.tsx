import { useState } from 'react';
import Auth from './components/Auth/Auth.tsx';
import Chat from './components/Chat.tsx';
import './styles.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [idInstance, setIdInstance] = useState<string>('');
    const [apiTokenInstance, setApiTokenInstance] = useState<string>('');

    const handleAuth = (id: string, token: string) => {
        setIdInstance(id);
        setApiTokenInstance(token);
        setIsAuthenticated(true);
    };

    return (
        <div className="app-container">
            {isAuthenticated ? (
                <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance}/>
            ) : (
                <Auth onAuth={handleAuth} />
            )}
        </div>
    );
};

export default App;