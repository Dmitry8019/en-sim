import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import './styles/index.scss';

function App() {
    //

    return (
        <>
            <div className='app app_dark_theme'>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                </div>
            </div>
        </>
    );
}

export default App;
