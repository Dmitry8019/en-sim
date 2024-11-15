import { Outlet } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';

import './styles/index.scss';
import './index.css';
import { useState } from 'react';
import { AppTheme, STORAGE_KEY_THEME } from './types';

function App() {
    //
    localStorage.setItem('user', '"eyLgleoxlevn4490sofg.dl95sPPlkjvkd.g30984lijvuSDbvdlwfEF"');

    const [theme, setTheme] = useState<AppTheme>(
        (localStorage.getItem(STORAGE_KEY_THEME) as AppTheme) ?? AppTheme.DARK,
    );

    const handleTheme = (theme: AppTheme) => {
        setTheme(theme);
        localStorage.setItem(STORAGE_KEY_THEME, theme);
    };

    return (
        <div className={`app ${theme}`}>
            <Navbar onTheme={handleTheme} theme={theme} />
            <div className='content-page'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
