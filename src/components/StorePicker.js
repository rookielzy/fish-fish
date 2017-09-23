import React from 'react';
import { Redirect } from 'react-router-dom';
import { getStoreName } from '../helpers';

class StorePicker extends React.Component {

    state = {
        redirect: false,
        storeName: ''
    }

    goToStore = (event) => {
        event.preventDefault();
        let storeName = this.storeInput.value;
        this.setState({
            redirect: true,
            storeName: storeName
        })
    }

    render() {
        if (!this.state.redirect) {
            return (
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>请输入商店名称</h2>
                    <input type="text"
                        required
                        placeholder="Store Name"
                        defaultValue={getStoreName()}
                        ref={input => this.storeInput = input}
                    />
                    <button type="submit">访问商店 →</button>
                </form>
            );
        } else {
            return (
                <Redirect to={`store/${this.state.storeName}`} />
            );
        }
    }
}


export default StorePicker;