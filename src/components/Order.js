import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Order extends React.Component {

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>不好意思, {fish ? fish.name : '这种'} 已经卖完啦!{removeButton}</li>
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup
                        component="span"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>{count}</span>
                    </CSSTransitionGroup>
                    份 {fish.name} {removeButton}
                </span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        );
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }

            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>您的订单</h2>
                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>总计:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        );
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
};

export default Order;