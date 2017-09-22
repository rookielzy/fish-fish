import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
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
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
            {
                context: this,
                state: 'fishes'                
            });

        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({ fishes });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes});
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

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
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
                    params={this.props.match.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                />
            </div>
        );
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired
};

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
