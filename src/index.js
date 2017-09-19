import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';
import Order from './components/Order';
import Inventory from './components/Inventory';
import './css/style.css';

class App extends React.Component {
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline='Fresh Fish Market'/>
                </div>
                <Order />
                <Inventory />
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('main'));
registerServiceWorker();
