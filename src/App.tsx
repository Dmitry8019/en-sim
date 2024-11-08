import { Outlet } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';

import './styles/index.scss';
import './index.css';

function App() {
    //
    localStorage.setItem('user', '"eyLgleoxlevn4490sofg.dl95sPPlkjvkd.g30984lijvuSDbvdlwfEF"');

    return (
        <div className='app app_dark_theme'>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
