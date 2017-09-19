import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import StorePicker from './components/StorePicker';
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

const NotFound = () => (
    <div>
        <h1>Sorry, can't find that.</h1>
    </div>
)

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={StorePicker} />
                <Route path="/store/:storeId" component={App} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('main'));
registerServiceWorker();
