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
import Fish from './components/Fish';
import base from './base';
import './css/style.css';
import sampleFishes from './sample-fishes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fishes: {},
            order: {}
        };
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline='Fresh Fish Market'/>
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes).map(key => 
                                    <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                            )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                />
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
