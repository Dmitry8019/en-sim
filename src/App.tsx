import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import AppRouter from './router/ui/AppRouter';

import './styles/index.scss';
import './index.css';

function App() {
    //

    return (
        <div className='app app_dark_theme'>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    );
}

export default App;
